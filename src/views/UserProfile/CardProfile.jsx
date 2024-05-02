const CardProfile = (props) => {
    const { book } = props;

    if (!book) {
        return null; // O puedes retornar un mensaje de error o un componente alternativo
    }
    console.log(book);
    return (
        <div className="h-80 min-w-40 max-w-40 mx-3 bg-orange-0 bg-opacity-20 p-2 rounded-xl">
            <div className="flex justify-center">
                <img
                    src={book.book_cover_url}
                    alt={book.book_title}
                    className="max-h-60 min-h-60 rounded-lg object-contain"
                />
            </div>
            <p className="font-bold truncate hover:underline hover:cursor-pointer  delay-200 text-base w-full">
                {book.book_title}
            </p>
            <p className="font-light text-sm">{book.author}</p>
        </div>
    );
};

export default CardProfile;
