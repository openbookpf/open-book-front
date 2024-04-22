import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";

const socket = io("https://open-book-chat.onrender.com");

function Chat() {
    const [isConnected, setIsConnected] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const name = socket.id;

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));

        socket.on("send_message", (data) => {
            setMessages((messages) => [...messages, data]);
        });

        socket.on("newConnected", (data) => {
            setMessages((messages) => [...messages, data]);
        });

        return () => {
            socket.off("connect");
            socket.off("send_message");
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            socket.emit("newConnected", {
                message: `${socket.id} has connected`,
            });
        }
    }, [isConnected]);

    //* para mover el scroll al ultimo
    useEffect(() => {
        messagesEndRef.current.scrollIntoView();
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage) return;

        if (/^\s+$/.test(newMessage)) return;

        socket.emit("send_message", {
            user: socket.id, //! CAMBIAR CON EL NOMBRE DE USUARIO LOGUEADO!
            message: newMessage,
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

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className=" mt-20 mb-3 text-2xl bg-cyan-0 text-white-0 px-4 py-1 rounded-xl h-10">
                OpenBook community
            </h1>
            <div className="grow bg-[#fef3ed] w-5/6 shadow-xl flex flex-col mb-5 text-xl overflow-auto rounded-xl pt-2">
                <div className="grow p-4 h-1/6 overflow-auto">
                    {messages.map((msg, index = 0) =>
                        name === msg.user ? (
                            <div className="flex justify-end" key={index++}>
                                <p className="w-3/6 bg-cyan-0 bg-opacity-55 p-2 rounded-xl mt-4 text-pretty text-ellipsis overflow-hidden">
                                    {msg.message}
                                </p>
                            </div>
                        ) : (
                            <div
                                className={
                                    msg.user
                                        ? "w-3/6 flex flex-col bg-orange-0 bg-opacity-30 my-4 p-2 rounded-xl"
                                        : "w-3/6 flex flex-col bg-cyan-0 bg-opacity-30 my-4 p-2 rounded-xl"
                                }
                                key={index++}
                            >
                                <p className="text-sm font-bold text-orange-0 text-pretty text-ellipsis overflow-hidden">
                                    {msg.user}
                                </p>
                                <p>{msg.message}</p>
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
        </div>
    );
}

export default Chat;
