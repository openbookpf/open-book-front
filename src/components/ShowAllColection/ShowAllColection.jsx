import CardProfile from "../../views/UserProfile/CardProfile";
import { IoMdClose } from "react-icons/io";

const ShowAllColection = (props) => {
    const { colection, setShowAllColection } = props;

    const handleClose = () => {
        setShowAllColection(false);
    };

    return (
        <div className="z-30 w-screen h-screen fixed bg-black bg-opacity-30">
            <div className="container mv:min-w-80 sm:w-2/3 h-[600px] flex flex-col border-black rounded-lg bg-[#fef3ed] bg-opacity-95 mx-auto mt-20 shadow-2xl p-5">
                <div className="flex justify-between">
                    <p className="text-2xl ml-3 truncate">
                        <strong>My Library</strong> <p className="mv:hiden sm:flex">| Books you bought</p>
                    </p>
                    <IoMdClose
                        onClick={handleClose}
                        className="cursor-pointer duration-200 hover:text-orange-0 text-3xl"
                    />
                </div>
                <div className="flex flex-wrap justify-center m-5 overflow-auto">
                    {colection.map((book) => (
                        <CardProfile key={book.ISBN} space={true} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowAllColection;
