import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditBooksModal = ({
  open,
  onClose,
  children,
  defaultValues,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  // Cuando se abra el modal, restablecer los valores del formulario
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset, defaultValues]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
  
    <div
      onClick={onClose}
      className={`fixed overflow-scroll inset-0 justify-center p-5 items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white-0 mt-48 mx-auto w-3/4 overflow-y-auto  rounded-xl shadow transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-white text-red-600 rounded-full text-base transition-colors hover:bg-gray-300 hover:text-blue-1"
        >
          X
        </button>
        {children}
        <div className="flex flex-col items-center mx-auto w-full justify-center gap-2 p-5">
          <form
            className="flex flex-col gap-3 text-sm text-blue-1 w-full items-center"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            {" "}
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">ISBN: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("ISBN")}
                placeholder="ISBN"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Title: </p>
              <input
                className="rounded-lg p-1 justify-between w-2/5"
                {...register("book_title")}
                placeholder="Book Title"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Book cover URL: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("book_cover_url")}
                placeholder="Book Cover URL"
              />
            </div>
            <div className="flex  flex-col gap-4 py-1 w-2/5 text-base font-normal">
              <p className="p-1">Book description: </p>
              <textarea
                className="rounded-lg h-60  p-1"
                {...register("book_description")}
                placeholder="Book Description"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Price (in USD): </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("price")}
                placeholder="Price"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Stock available: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("quantity")}
                placeholder="Quantity"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Book status: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("book_status")}
                placeholder="Book Status"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1"> Year of Edition:</p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("year_of_edition")}
                placeholder="Year of Edition"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Age Segment: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("age_segment")}
                placeholder="Age Segment"
              />
            </div>
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1"> Author:</p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("author")}
                placeholder="Author"
              />
            </div>
            {/*  <div className="flex gap-4 py-1 text-base font-normal">
              
              </div>
              <p className="p-1">Genres:</p>
            <input
              className="rounded-lg p-1 w-2/4"
              {...register("genres")}
              placeholder="Genres"
            /> */}
            <div className="flex gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1">Editorial:</p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("editorial")}
                placeholder="Editorial"
              />
            </div>
            <div className="flex  gap-4 p-1 justify-between w-2/5 text-base font-normal">
              <p className="p-1"> Language: </p>
              <input
                className="rounded-lg p-1 w-2/4"
                {...register("language")}
                placeholder="Language"
              />
            </div>
            <button
              className="bg-blue-0 hover:bg-blue-1 transition-colors text-white-0 w-2/6 items-center mx-auto p-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBooksModal;
