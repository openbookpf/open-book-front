const Favorites = (props) => {
  console.log(props.newusuario);
  return (
    <div>
      {props.newusuario.favorites.map((favorite) => {
        return (
          <div>
            <h2>{favorite.book_name}</h2>
            <h2>{favorite.description}</h2>
            <h2>{favorite.book_picture}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;

{
  /* <h2>{props.favorites.book_name}</h2>
      <h2>{props.favorites.description}</h2>
      <img src={props.favorites.book_picture} /> */
}
