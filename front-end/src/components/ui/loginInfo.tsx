import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import PostUser from "../features/postUserComponent.";
import { IoIosArrowBack } from "react-icons/io";
import UserLogin from "../features/userLogin";
import { useContext } from 'react';
import { AuthContext } from "@/context/authContext";
import UserProfile from "../features/userProfile";
import { TbLogout2 } from "react-icons/tb";

export default function LoginInfo() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const { user, authenticated, logout } = useContext(AuthContext);

    const handleClose = () => { setRegister(false); setLogin(false) };

    return (
        <>
            <Button onPress={onOpen} className="text-warning bg-transparent min-w-0 min-h-0 flex gap-2 rounded-sm px-1" radius="none">
                {authenticated ? <>
                    {user?.picture ? <img src={user.picture} className="rounded-full dark:bg-black/20 bg-white h-[30px] object-cover" />
                        : <span className="rounded-full dark:bg-black/20 bg-white p-1"><IoPersonSharp size={20} /></span>}
                    <p className="cursor-pointer">{user?.username}</p>
                </> :
                    <>
                        <span className="rounded-full dark:bg-black/20 bg-white p-1"><IoPersonSharp size={20} /></span>
                        <p>Log in</p>
                    </>
                }
            </Button>
            <Modal onClose={handleClose} className="rounded-sm dark:bg-secondary transition-all" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} radius="none"
                classNames={{
                    base: `${register || login ? "min-w-[400px] " : user ? "min-w-[300px]" : "min-w-[250px] "} max-w-fit dark:bg-secondary rounded-sm`,
                    body: "w-full pb-5", wrapper: "flex items-center justify-center",
                }}>
                <ModalContent className="items-center flex-1 relative">
                    <ModalHeader className="flex flex-col gap-1 text-center cursor-default text-warning">
                        {register ? "Register" : login ? "Log in" : authenticated ? "Profile" : "Not logged"}
                        {(register || login) && <Button isIconOnly onPress={() => { setRegister(false); setLogin(false) }}
                            className="bg-transparent text-warning absolute top-0.5 left-0.5 z-100"><IoIosArrowBack size={16} /></Button>}
                        {user && <Button isIconOnly onPress={logout}
                            className="bg-transparent text-danger absolute top-0.5 left-0.5 z-100"><TbLogout2 size={16} /></Button>}
                    </ModalHeader>
                    <ModalBody className="pb-5">
                        {!register && !login && !authenticated && <>
                            <Button variant="ghost" color="warning" className="w-full rounded-sm" radius="none" onPress={() => setLogin(true)}> Login </Button>
                            <Button variant="ghost" color="warning" className="w-full rounded-sm" radius="none" onPress={() => setRegister(true)}> Register </Button>
                        </>}
                        {register && <PostUser setRegister={setRegister} />}
                        {login && <UserLogin setLogin={setLogin} />}
                        {authenticated && <UserProfile user={user} />}
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}