package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"
)

type Post struct {
	Content  string
	Language string
}

var posts = [5]Post{
	{Content: `nested_list = [[1, 2, [3]], 4, [5, 6]]
flat_list = sum(map(lambda x: x if isinstance(x, list) else [x], nested_list), [])
print(flat_list)`, Language: "python"},
	{Content: `const fib = (n, memo = {}) => n in memo ? memo[n] : (n <= 2 ? 1 : memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
console.log(fib(10));`, Language: "javascript"},
	{Content: `package main

import "fmt"

func main() {
    x, y := 5, 10
    x, y = y, x
    fmt.Println(x, y)  // Output: 10 5
}`, Language: "golang"},
	{Content: `fn main() {
    let num = 7;
    println!("{}", if num % 2 == 0 { "Even" } else { "Odd" });
}`, Language: "rust"},
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}
type ReqPost struct {
	Content  string   `json:"content"`
	Language string   `json:"language"`
	Tags     []string `json:"tags"`
}

type UserInfo struct {
	Bio       string    `json:"bio"`
	Gender    string    `json:"gender"`
	Country   string    `json:"country"`
	City      string    `json:"city"`
	Avatar    string    `json:"avatar"`
	FirstName string    `json:"firstname"`
	LastName  string    `json:"lastname"`
	BirthDate time.Time `json:"birth_date"`
}

func NewUser(i int) User {
	return User{
		Username: fmt.Sprintf("User%d_g", i),
		Email:    fmt.Sprintf("user%d_g@test.com", i),
		Password: "pa55word",
	}
}

func (u User) createUser(wg *sync.WaitGroup, i int) {
	defer wg.Done()
	jsonUser := new(bytes.Buffer)
	json.NewEncoder(jsonUser).Encode(u)
	resp, err := http.Post("http://localhost:4000/api/v1/users", "application/json", jsonUser)
	if err != nil {
		fmt.Println(err)
		return
	}
	var res struct {
		Token string `json:"token"`
	}
	json.NewDecoder(resp.Body).Decode(&res)
	resp.Body.Close()

	ui := UserInfo{
		Bio:       fmt.Sprintf("Hello my name is Test test user and i am the number %d that got seeded in the database", i),
		Gender:    "male",
		Country:   "Greece",
		City:      "Volos",
		FirstName: fmt.Sprintf("firstname_%d", i),
		LastName:  fmt.Sprintf("lastname_%d", i),
		BirthDate: time.Now(),

		// Avatar: ,
	}
	jsonUI := new(bytes.Buffer)
	json.NewEncoder(jsonUI).Encode(ui)
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, "http://localhost:4000/api/v1/user_info", jsonUI)
	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", res.Token))
	resp, err = client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Response:", string(body))
	resp.Body.Close()

	p := ReqPost{
		Content:  posts[i%5].Content,
		Language: posts[i%5].Language,
		Tags:     []string{posts[i%5].Language},
	}

	jsonPost := new(bytes.Buffer)
	json.NewEncoder(jsonPost).Encode(p)

	req, err = http.NewRequest(http.MethodPost, "http://localhost:4000/api/v1/posts", jsonPost)
	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", res.Token))
	resp, err = client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	body, _ = io.ReadAll(resp.Body)
	fmt.Println("Response:", string(body))
}

func main() {
	wg := &sync.WaitGroup{}
	for i := 500; i < 600; i++ {
		wg.Add(1)

		u := NewUser(i)
		go u.createUser(wg, i)
		time.Sleep(500 * time.Millisecond)
	}
	wg.Wait()

}
