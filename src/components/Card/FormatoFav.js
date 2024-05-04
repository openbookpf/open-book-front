function FormatoFav(id, newobj) {
  const { book_name, book_picture, description, user_id } = newobj;
  const newobject = {
    book_name: book_name,
    book_picture: book_picture,
    description: description,
    user_id: user_id,
  };
  return newobject;
}

module.exports = FormatoFav;
