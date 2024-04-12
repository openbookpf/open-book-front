import loadingImageBook from "../../assets/loading_book.gif";

const LoadingStockComponent = () => {
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center content-center">
        <img className="w-1/6" src={loadingImageBook} alt="LOADING-BOOK" />
        <h5>LOADING...</h5>
      </div>
    </div>
  );
};

export default LoadingStockComponent;
