const CardProfile = ({ book }) => {
    const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4z9ZvmzzY20TqM7G0msMdtWUJ3kjVWkkvdgMOfV8pw&s";
    const name = "Ernesto Sabato";
    const title = "El Tunel";

    return (
        <div className="h-80 min-w-40 mx-2">
            <img src={img} alt={title} className="max-h-60 rounded-lg object-contain" />
            <p className="font-bold truncate hover:underline hover:cursor-pointer  delay-200 text-base w-full">
                {title}
            </p>
            <p className="font-light text-sm">{name}</p>
        </div>
    );
};

export default CardProfile;
