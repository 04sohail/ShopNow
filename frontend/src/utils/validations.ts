import * as Yup from 'yup';


export const login_schema = Yup.object().shape({
    email_address: Yup.string()
        .required("Email is required")
        .email("Invalid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must be a valid format"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must have one uppercase letter")
        .matches(/[a-z]/, "Must have one lowercase letter")
        .matches(/[0-9]/, "Must have one number")
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, "Must have one special character")
        .matches(/^[^\s]*$/, "No spaces allowed"),
});


export const signupSchema = Yup.object({
    first_name: Yup.string()
        .required("First Name is required")
        .max(30, "First Name should be at most 30 characters")
        .matches(/^[a-zA-Z]+$/, "First Name can only contain letters"),
    last_name: Yup.string()
        .required("Last Name is required")
        .max(30, "Last Name should be at most 30 characters")
        .matches(/^[a-zA-Z]+$/, "Last Name can only contain letters"),
    email_address: Yup.string()
        .required("Email is required")
        .email("Invalid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must be a valid format"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must have one uppercase letter")
        .matches(/[a-z]/, "Must have one lowercase letter")
        .matches(/[0-9]/, "Must have one number")
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, "Must have one special character")
        .matches(/^[^\s]*$/, "No spaces allowed"),
    mobile_number: Yup.string()
        .required("Phone Number is required")
        .matches(/^[6-9]\d{9}$/, "Phone Number must start with 6, 7, 8, or 9 and be exactly 10 digits"),
    agreeTerms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
});

export const adminUpdateUserSchema = Yup.object({
    first_name: Yup.string()
        .required("First Name is required")
        .max(30, "First Name should be at most 30 characters")
        .matches(/^[a-zA-Z]+$/, "First Name can only contain letters"),
    last_name: Yup.string()
        .required("Last Name is required")
        .max(30, "Last Name should be at most 30 characters")
        .matches(/^[a-zA-Z]+$/, "Last Name can only contain letters"),
    email_address: Yup.string()
        .required("Email is required")
        .email("Invalid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must be a valid format"
        ),
    mobile_number: Yup.string()
        .required("Phone Number is required")
        .matches(/^[6-9]\d{9}$/, "Phone Number must start with 6, 7, 8, or 9 and be exactly 10 digits"),
});


// OTP Validation Schema
export const otpSchema = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]{4}$/, 'OTP must be 4 digits')
});

export const forgetPasswordSchema = Yup.object({
    email_address: Yup.string()
        .required("Email is required")
        .email("Invalid email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must be a valid format"
        ),
});


export const resetPasswordSchema = Yup.object({
    new_password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must have one uppercase letter")
        .matches(/[a-z]/, "Must have one lowercase letter")
        .matches(/[0-9]/, "Must have one number")
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, "Must have one special character")
        .matches(/^[^\s]*$/, "No spaces allowed"),
    confirm_password: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must have one uppercase letter")
        .matches(/[a-z]/, "Must have one lowercase letter")
        .matches(/[0-9]/, "Must have one number")
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, "Must have one special character")
        .matches(/^[^\s]*$/, "No spaces allowed"),
});
