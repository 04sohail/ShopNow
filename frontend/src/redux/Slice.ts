import { createSlice } from "@reduxjs/toolkit"
import { CartItem } from "../types/types";

const initialState = {
    carts: [{
        id: 0,
        product: {
            availabilityStatus: "",
            brand: "",
            category: "",
            description: "",
            dimensions: { width: 0, height: 0, depth: 0 },
            discountPercentage: 0,
            id: 0,
            images: [''],
            meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
            minimumOrderQuantity: 0,
            price: 0,
            rating: 0,
            returnPolicy: "",
            reviews: [{}, {}, {}],
            shippingInformation: "",
            sku: "",
            stock: 0,
            tags: ['', ''],
            thumbnail: "",
            title: "",
            warrantyInformation: "",
            weight: 0
        },
        quantity: 1
    }
    ]
}

// Helper function to load cart from sessionStorage
const loadCartFromStorage = () => {
    try {
        const storedCarts = sessionStorage.getItem("carts");
        if (storedCarts) {
            const parsedCarts = JSON.parse(storedCarts);
            // Ensure the dummy item is in the array
            if (!parsedCarts.some((cart: CartItem) => cart.id === 0)) {
                return [initialState.carts[0], ...parsedCarts];
            }
            return parsedCarts;
        }
    } catch (error) {
        console.error("Error loading carts from sessionStorage:", error);
    }
    return initialState.carts;
};

const cart_slice = createSlice({
    name: "carts",
    initialState: {
        carts: loadCartFromStorage()
    },
    reducers: {
        addCart: (state, action) => {
            const { id } = action.payload;

            // Check if item already exists
            const existingItemIndex = state.carts.findIndex((cart: CartItem) => cart.id === id);
            console.log(action.payload.quantity);
            
            if (existingItemIndex === -1) {
                // If item doesn't exist, add it
                const newCart = {
                    id: action.payload.id,
                    product: action.payload.product,
                    quantity: action.payload.quantity
                };
                state.carts.push(newCart);
                sessionStorage.setItem("carts", JSON.stringify(state.carts));

            } else {
                // If item exists, increment quantity
                state.carts[existingItemIndex].quantity += action.payload.quantity;
                sessionStorage.setItem("carts", JSON.stringify(state.carts));
            }
        },
        removeCart: (state, action) => {
            const cartId = action.payload.id;
            state.carts = state.carts.filter((cart: CartItem) => cart.id !== cartId);
            sessionStorage.setItem("carts", JSON.stringify(state.carts));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const cartIndex: number = state.carts.findIndex((cart: CartItem) => cart.id === id);
            if (cartIndex !== -1) {
                state.carts[cartIndex].quantity = quantity;
                sessionStorage.setItem("carts", JSON.stringify(state.carts));
            } else {
                console.log("Cart not found");
            }
        },
    }
});

export const { addCart, removeCart, updateQuantity } = cart_slice.actions;
export default cart_slice.reducer;