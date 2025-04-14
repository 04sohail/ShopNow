export class Product_services {
    URL = "https://dummyjson.com/products"
    async GetProducts() {
        try {
            const api_response = await fetch(this.URL)
            if (api_response.ok) {
                const response = api_response.json()
                return response
            }
        } catch (error) {
            console.log("Error while fetching products data", error);
        }
    }
}
