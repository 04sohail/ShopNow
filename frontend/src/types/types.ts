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


export interface User_Login_Context {
    first_name: string;
    last_name: string;
    email_address: string;
    user_type: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    weight: number;
    tags: string[];
    availabilityStatus: string;
    returnPolicy: string;
    warrantyInformation: string;
    shippingInformation: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    reviews: Review[];
    sku: string;
}

export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface CartState {
    carts: CartItem[];
}

export interface LocationState {
    product?: Product;
    from?: string;
}

export interface AdminUsers {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number:number;
    email_address: string;
}
export interface AdminUserRegistration {
    first_name: string;
    last_name: string;
    mobile_number:string;
    email_address: string;
    password: string;
    user_type:string;
}
export interface AdminUserUpdate {
    first_name: string;
    last_name: string;
    mobile_number:string;
    email_address: string;
    user_type:string;
}