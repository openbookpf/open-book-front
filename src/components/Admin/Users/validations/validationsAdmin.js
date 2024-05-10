export const validationsForm = (key, value, errorForm, setErrorForm) => {
    //?-validacion del Email -------------------------------------------------------
    if (key === "email") {
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value)) {
            return setErrorForm({ ...errorForm, [key]: "Invalid email" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }

    //?-validacion del Password -------------------------------------------------------
    if (key === "password") {
        //? si no tiene nada
        if (!value) {
            return setErrorForm({ ...errorForm, [key]: "This field is required" });
        }
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)) {
            return setErrorForm({ ...errorForm, [key]: "Password does not meet the requirements" });
        }
        return setErrorForm({ ...errorForm, [key]: "" });
    }
};
