import loadingImageBook from "../../assets/loading_book.gif";

const LoadingStockComponent = () => {
    return (
        <div className="container mx-auto mt-20">
            <div className="flex flex-col justify-center items-center content-center mx-auto mt-20">
                <img className="w-1/6" src={loadingImageBook} alt="LOADING-BOOK" />
                <h5>Loading...</h5>
            </div>
        </div>
    );
};

export default LoadingStockComponent;
