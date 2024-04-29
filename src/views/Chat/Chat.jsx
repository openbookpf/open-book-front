import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUser } from "react-icons/fa";
import ShowAllUsers from "../../components/ShowUsers/ShowUsers";

const socket = io("https://open-book-chat.onrender.com");

function Chat() {
    const [showUsers, setShowUsers] = useState(false);
    const [users, setUsers] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(() => {
        //? Cargar mensajes del localStorage o iniciar con un arreglo vacío
        // const savedMessages = localStorage.getItem("chatMessages");
        const savedMessages = null;
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const messagesEndRef = useRef(null);

    //! -user conected
    const { user, isAuthenticated, isLoading } = useAuth0();
    //! --------------

    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        if (isAuthenticated) {
            socket.on("user_connected", (data) => {
                const usersEmil = data.map((user) => user.email);
                setUsers([...new Set(usersEmil)]);
                // setUsers([...new Set(data)]);
            });
        }

        if (isAuthenticated) {
            socket.emit("user_connected", {
                user: user.name,
                email: user.email,
            });
        }

        if (isAuthenticated) {
            socket.emit("newConnected", {
                message: `${user.name} has connected`,
            });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));

        socket.on("send_message", (data) => {
            setMessages((messages) => {
                const updatedMessages = [...messages, data];
                //? Guardar los mensajes actualizados en localStorage.
                // localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });

        socket.on("newConnected", (data) => {
            setMessages((messages) => [...messages, data]);
        });

        return () => {
            if (isAuthenticated) {
                socket.emit("user_disconnected", {
                    user: user.name,
                    email: user.email,
                });
            }
            socket.off("connect");
            socket.off("send_message");
            socket.off("user_connected");
        };
    }, []);

    //! para mover el scroll al ultimo
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage) return;

        if (/^\s+$/.test(newMessage)) return;

        const date = new Date();
        const hora = date.getHours();
        const minutos = date.getMinutes();

        socket.emit("send_message", {
            user: user.name,
            message: newMessage,
            hour: `${hora}:${minutos}`,
            email: user.email,
        });

        setNewMessage("");
    };

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    //!mostrar todos los usuarios
    const handleShowUsers = () => {
        setShowUsers(true);
    };

    return isAuthenticated ? (
        <div className="flex flex-col items-center h-screen">
            <h1 className=" mt-20 mb-3 text-2xl bg-cyan-0 text-white-0 px-4 py-1 rounded-xl h-10">
                OpenBook community
            </h1>
            <div className="grow bg-[#fef3ed] dark:bg-gray-600 w-5/6 shadow-xl flex flex-col mb-5 text-xl overflow-auto rounded-xl pt-2">

                <div className="flex ml-4 mb-2">
                    <FaUser
                        onClick={handleShowUsers}
                        className={users.length ? "text-lg text-cyan-0" : "text-lg text-gray-600"}
                    />
                    <p className="text-sm ml-2">{users.length} users connected</p>
                </div>

                <div className="grow p-4 h-1/6 overflow-auto">
                    {messages.map((msg, index = 0) =>
                        user.email === msg.email ? (
                            <div className="flex justify-end" key={index++}>
                                <p className="w-3/6 bg-cyan-0 bg-opacity-55 p-2 rounded-xl mt-4 text-pretty text-ellipsis overflow-hidden flex items-end">
                                    <div className="grow text-lg">{msg.message}</div>
                                    <div className="text-sm w-9 text-white-0">{msg.hour}</div>
                                </p>
                            </div>
                        ) : (
                            <div className={msg.user ? null : "flex justify-center"}>
                                <div
                                    className={
                                        msg.user
                                            ? "w-3/6 flex flex-col bg-orange-0 bg-opacity-30 my-4 p-2 rounded-xl"
                                            : "w-3/6 bg-cyan-0 bg-opacity-30 my-2 p-2 rounded-xl"
                                    }
                                    key={index++}
                                >
                                    <p className="text-sm font-bold text-orange-0 text-pretty text-ellipsis overflow-hidden">
                                        {msg.user}
                                    </p>
                                    <div className="flex items-end">
                                        <div className={msg.user ? "grow text-lg" : "grow text-sm text-center"}>
                                            {msg.message}
                                        </div>
                                        <div className="text-sm w-9 text-white-0">{msg.hour}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="h-20 flex items-end justify-end mr-5 mb-3">
                    <textarea
                        type="text"
                        onChange={handleChange}
                        value={newMessage}
                        placeholder="say hello to the OpenBook community!"
                        className="mr-2 w-3/6 border-2 rounded-xl p-2"
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-orange-0 text-white-0 w-8 h-8 rounded-full duration-200 hover:scale-105 flex items-center justify-center"
                    >
                        <IoSend />
                    </button>
                </div>
            </div>
            {showUsers ? <ShowAllUsers setShowUsers={setShowUsers} users={users} /> : null}
        </div>
    ) : (
        <div className="flex flex-col items-center h-screen">
            <h1 className=" mt-20 mb-3 text-2xl bg-cyan-0 text-white-0 px-4 py-1 rounded-xl h-10">
                OpenBook community
            </h1>
            <div className="grow bg-[#fef3ed] w-5/6 shadow-xl flex flex-col mb-5 text-xl overflow-auto rounded-xl pt-2">
                <div className=" flex justify-center mt-6">
                    <p>
                        Sign in to interact with the <strong>OpenBook</strong> community
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Chat;
