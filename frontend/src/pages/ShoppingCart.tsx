import Header from '../components/Header_section'
import Footer from '../components/Footer_section'
import Cart_section from "../components/Cart_section"
const ShoppingCart = () => {
    return (
        <>
            <div className='h-svh flex flex-col justify-between'>
                <div>
                    <Header />
                </div>
                <div className='mb-10'>
                    <Cart_section />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ShoppingCart
