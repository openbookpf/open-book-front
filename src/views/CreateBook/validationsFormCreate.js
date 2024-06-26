export const validationsForm = (key, value, errorForm, setErrorForm) => {
    //?-validacion del ISBN -------------------------------------------------------
    if (key === "ISBN") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (isNaN(value)) {
            return setErrorForm({ ...errorForm, [key]: "The ISBN must be a number" });
        }
        if (value < 1 || value > 9999999999999) {
            return setErrorForm({ ...errorForm, [key]: "Incorrect ISBN" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion del titulo------------------------------------------------------
    if (key === "book_title") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (value.length > 255) {
            return setErrorForm({ ...errorForm, [key]: "The title is too long" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion del autor-------------------------------------------------------
    if (key === "author") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (/\d/.test(value)) {
            return setErrorForm({ ...errorForm, [key]: "The author's name cannot contain numbers." });
        }
        if (value.length === 1) {
            return setErrorForm({ ...errorForm, [key]: "Author's name is too short" });
        }
        if (value.length > 100) {
            return setErrorForm({ ...errorForm, [key]: "Author's name is too long" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion del genero------------------------------------------------------
    if (key === "genre") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (/\d/.test(value)) {
            return setErrorForm({ ...errorForm, [key]: "Gender cannot contain numbers" });
        }
        if (value.length === 1) {
            return setErrorForm({ ...errorForm, [key]: "The genre is too short" });
        }
        if (value.length > 100) {
            return setErrorForm({ ...errorForm, [key]: "The genre is too long" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion de la descripcion-----------------------------------------------
    if (key === "book_description") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (value.length === 1) {
            return setErrorForm({ ...errorForm, [key]: "The description is too short" });
        }
        if (value.length > 2000) {
            return setErrorForm({ ...errorForm, [key]: "The description is too long" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion del precio------------------------------------------------------
    if (key === "price") {
        if ((value <= 0) | !value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (!/^[0-9]+([.])([0-9]{2})?$/.test(value)) {
            return setErrorForm({ ...errorForm, [key]: "The price must include cents (10.00, 8.99, ...)" });
        }
        if (value > 9999) {
            return setErrorForm({ ...errorForm, [key]: "The price is too high" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }
};

//?-validacion de imagen--------------------------------------------------------------------------------------
export const validationImg = (selectedFile, errorForm, setErrorForm) => {
    if (!selectedFile) {
        return setErrorForm({ ...errorForm, img: "This field is required" });
    }
    if (!/image\/(jpeg|png)/.test(selectedFile.type)) {
        return setErrorForm({ ...errorForm, img: "The file must be an image (.jpg or .png)" });
    }
    return setErrorForm({ ...errorForm, img: "" });
};
