import { Cart, CartItem } from "../types/types"
export class Cart_services {
    URL = "http://localhost:3000/cart"
    async getCart(): Promise<Cart | undefined> {
        try {
            const API_RESPONSE = await fetch(this.URL)
            if (API_RESPONSE.ok) {
                const data = API_RESPONSE.json()
                return data
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async postCart(cart: CartItem) {
        try {
            const API_RESPONSE = await fetch(this.URL, {
                method: "POST",
                body: JSON.stringify(cart)
            })
            if (API_RESPONSE.ok) {
                const data = API_RESPONSE.json()
                return data
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
