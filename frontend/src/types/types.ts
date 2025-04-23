export interface User_Registration {
    first_name: string;
    last_name: string;
    email_address: string;
    password: string;
    mobile_number: string;
    agreeTerms: boolean;
}
export interface User_Login {
    email_address: string;
    password: string;
}

export interface Get_User_From_Email_Address {
    email_address: string;
}
export interface User_Login_Context {
    first_name: string;
    last_name: string;
    email_address: string;
    user_type: string;
}

export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}


export interface AdminUsers {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number: number;
    email_address: string;
    user_type: string;
    created_at: string;
}
export interface AdminUserRegistration {
    first_name: string;
    last_name: string;
    mobile_number: string;
    email_address: string;
    password: string;
    user_type: string;
}
export interface AdminUserUpdate {
    first_name: string;
    last_name: string;
    mobile_number: string;
    email_address: string;
    user_type: string;
}

export interface UserRegistrationOtp {
    email_address: string;
    otp: number;
}
export interface UserResetPassword {
    email_address: string;
    new_password: string;
    confirm_password: string;
}

export interface ProductDetailsBody {
    title: string;
    description: string;
    category: string;
    price: string;
    images: string[];
    thumbnail: string;
    discountpercentage: string;
    rating: string;
    stock: string;
    brand: string;
    warrantyinformation: string;
    shippinginformation: string;
    availabilitystatus: string;
    returnpolicy: string;
    status: string;
}

export interface ProductDetails {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    thumbnail: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    sku: string;
    warrantyinformation: string;
    shippinginformation: string;
    availabilitystatus: string;
    returnpolicy: string;
    created_at: string;
    updated_at: string;
    status: string;
}

export interface ProductUpdateBody {
    title: string;
    description: string;
    category: string;
    price: string;
    images: string[];
    thumbnail: string;
    discountpercentage: string;
    rating: string;
    stock: string;
    brand: string;
    warrantyinformation: string;
    shippinginformation: string;
    availabilitystatus: string;
    returnpolicy: string;
    status: string;
}