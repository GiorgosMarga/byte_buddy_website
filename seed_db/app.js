const createUsers = async () => {
    for(var i = 0; i < 100; i++) {
        const user = {
            "username": `User ${i}`, 
            "password": `pa55word`, 
            "email": `user${i}@gmail.com`, 
        }
        const res = await fetch("http://localhost:4000/api/v1/users", {
            method:"POST",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            }
        })
        console.log(await res.json())
    }
}

createUsers().then(() => "All users have been created")