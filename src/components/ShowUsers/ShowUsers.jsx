import { TbPointFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const ShowAllUsers = ({ setShowUsers, users }) => {
    const handleClose = () => {
        setShowUsers(false);
    };

    return (
        <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-30">
            <div className=" mv:w-4/5 sm:w-2/5 max-h-4/5 flex flex-col border-black rounded-lg bg-[#fef3ed] bg-opacity-95 mx-auto mt-20 shadow-2xl p-5 overflow-auto">
                <div className="flex" onClick={handleClose}>
                    <p className="text-xl font-bold grow ml-4">Users online</p>
                    <IoClose className="text-2xl w-8 duration-200 hover:text-orange-0 cursor-pointer" />
                </div>
                {users.map((user) => (
                    <div className="flex items-center text-lg">
                        <TbPointFilled className="text-cyan-0" />
                        <p className="truncate">{user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowAllUsers;
