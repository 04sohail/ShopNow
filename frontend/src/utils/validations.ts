import * as Yup from 'Yup';


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




export const productAddSchema = Yup.object().shape({
    title: Yup
        .string()
        .required('Title is required')
        .max(255, 'Title must be at most 255 characters'),
    description: Yup.string().required('Description is required'),
    category: Yup
        .string()
        .required('Category is required')
        .oneOf(
            ['beauty', 'fragrances', 'furniture', 'groceries'],
            'Category must be one of: beauty, fragrances, furniture, groceries'
        ),
    price: Yup
        .number()
        .required('Price is required')
        .positive('Price must be greater than 0')
        .typeError('Price must be a number'),
    images: Yup
        .array()
        .of(
            Yup
                .string()
                .url('Must be a valid URL')
                .required('Image URL is required')
        )
        .min(1, 'At least one image is required'),
    thumbnail: Yup
        .string()
        .url('Thumbnail must be a valid URL')
        .required('Thumbnail is required'),
    discountpercentage: Yup
        .number()
        .nullable()
        .min(0, 'Discount percentage must be at least 0')
        .max(100, 'Discount percentage must be at most 100')
        .typeError('Discount percentage must be a number')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    rating: Yup
        .number()
        .nullable()
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating must be at most 5')
        .typeError('Rating must be a number')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    stock: Yup
        .number()
        .required('Stock is required')
        .nullable()
        .integer('Stock must be an integer')
        .min(0, 'Stock must be at least 0')
        .typeError('Stock must be a number')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    brand: Yup
        .string()
        .nullable()
        .max(255, 'Brand must be at most 255 characters')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    warrantyinformation: Yup
        .string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    shippinginformation: Yup
        .string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    availabilitystatus: Yup
        .string()
        .nullable()
        .max(255, 'Availability status must be at most 255 characters')
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
    returnpolicy: Yup
        .string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value)),
});