import React, {useState} from "react";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
};

export default function RegistrationForm() {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.targer;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return(
        <form>
            <label>
                First Name:
                <input
                    value={values.firstName}
                    onChange={handleInputChange}
                    label="First Name"
                    />
            </label>
        </form>
    )
}