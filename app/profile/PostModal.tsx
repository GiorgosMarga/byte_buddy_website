import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, SharedSelection, Spinner } from "@nextui-org/react";
import { makeRequest } from "../request";
import { StatusCodes } from "http-status-codes";
import LanguageDropdown from "./LanguageDropdown";

type Props = {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: any
    refetchPosts: () => void
}

const initialPost = {
    content: "",
    language: "Select Language",
    tags: [],
    id: -1
}
const initialErrors = {
    content: "",
    language: "",
    tags: ""
}
const PostModal = ({ isOpen, onOpen, onOpenChange, refetchPosts }: Props) => {
    const [tag, setTag] = useState("")
    const [post, setPost] = useState<Post>(initialPost)
    const [postErrors, setPostErrors] = useState(initialErrors)
    const [isLoading, setIsLoading] = useState(false)


    const setErrors = (key: string, val: string) => {
        setPostErrors((prev) => ({
            ...prev,
            [key]: val
        }))
    }
    const onPressHandler = async () => {
        setIsLoading(true)
        const result = await makeRequest("/posts", "POST", JSON.stringify(post), true)
        setIsLoading(false)
        if (result?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
            for (var key in result.body["errors"]) {
                setErrors(key, result.body["errors"][key])
            }
        } else if (result.statusCode === StatusCodes.CREATED) {
            refetchPosts()
            onOpenChange()
        }

    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setPost((prev) => ({
                ...prev,
                "tags": [...prev.tags, tag]
            }))
            setTag("")
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            "content": e.target.value
        }))
    }

    const removeTag = (key: number) => {
        post.tags.splice(key, 1)
        setPost((prev) => (
            {
                ...prev,
            }))
    }

    const onChangeLanguageHandler = (e: SharedSelection) => {
        setPost((prev) => (
            {
                ...prev,
                "language": e.currentKey as string
            }
        ))
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=" self-center h-[80%] min-w-[60%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-danger-300">Create New Code Snippet</ModalHeader>
                            <ModalBody className="flex flex-col overflow-y-scroll scrollbar-hide">
                                <Textarea
                                    errorMessage={postErrors.content}
                                    isInvalid={postErrors.content.length > 0}
                                    disableAutosize
                                    onChange={(e) => onChangeHandler(e)}
                                    value={post.content}
                                    classNames={{
                                        base: "h-[100%]",
                                        input: "h-[100%] min-h-[350px]",
                                    }}
                                />
                                <div className="flex flex-col">
                                    <div className={`flex gap-2 ${postErrors.tags.length > 0 ? "bg-[#310413]" : "bg-[#121212]"} p-5 rounded-xl flex-wrap`}>
                                        {post.tags.map((tag, index) => <div onClick={() => removeTag(index)} className="bg-[#27272a] p-1 px-2 shadow-lg rounded-lg cursor-pointer hover:scale-105 duration-150 ease-soft-spring transition-all" key={index}>{tag}</div>)}
                                        <input className={`outline-none ${postErrors.tags.length > 0 ? "bg-[#310413]" : "bg-[#121212]"} rounded-lg px-2 mt-2 w-full`} value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={onKeyDownHandler}></input>
                                    </div>
                                    <p className="text-danger text-xs mt-1">{postErrors.tags}</p>
                                </div>
                                <p className="-mt-1 self-end mr-2">{`${post.tags.length}/5`}</p>
                                <div className="flex flex-col">
                                    <LanguageDropdown selectedKey={post.language} setSelectedKey={onChangeLanguageHandler} />
                                    <p className="text-danger text-xs">{postErrors.language}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {!isLoading ? <Button color="danger" onPress={onPressHandler}>
                                    Create
                                </Button> : <Spinner color="danger" />}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}

export default PostModal
