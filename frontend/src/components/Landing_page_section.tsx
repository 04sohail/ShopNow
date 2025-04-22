import { useEffect, useState } from 'react'
import { ProductDetails } from '../types/types'
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { get_all_products } from '../services/admin/products_controller';

const Landing_page_section = () => {
    // LOADING SCREEN
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('Loading products...');
    const [isLoading, setIsLoading] = useState(false);
    // LOADING SCREEN MESSAGE
    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress(oldProgress => {
                const newProgress = Math.min(oldProgress + Math.random() * 10, 100);

                // Update loading message based on progress
                if (newProgress > 80 && message === 'Loading products...') {
                    setMessage('Almost ready...');
                } else if (newProgress > 50 && message === 'Loading products...') {
                    setMessage('Preparing your experience...');
                }

                // Clear interval when progress reaches 100%
                if (newProgress === 100) {
                    clearInterval(timer);
                }

                return newProgress;
            });
        }, 300);

        return () => {
            clearInterval(timer);
        };
    }, [message]);
    const toastFlag = JSON.parse(localStorage.getItem("toastFlag") || "[]")
    if (toastFlag) {
        toast.success('Logged In Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
    localStorage.setItem("toastFlag", JSON.stringify(false))

    const navigate = useNavigate()
    const [products, setProducts] = useState<ProductDetails[]>([] as ProductDetails[])
    const getProducts = async () => {
        setIsLoading(true)
        const response = await get_all_products()
        if (response.status === 200) {
            setProducts(response.data.data)
            setIsLoading(false)
            setProgress(100)
            setMessage('Products loaded successfully!')
        } else {
            setIsLoading(false)
            setProgress(100)
            setMessage('Failed to load products.')
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    const handleProdDetails = (id: number) => {
        const selectedProduct = products.find((product) => product.id === id);
        if (selectedProduct) {
            navigate(`/landing_page/${selectedProduct.id}`, { state: { product: selectedProduct } });
        } else {
            console.error("Product not found");
        }
    }
    return (
        <>
            {/* LOADING SCREEN */}
            {isLoading && (<div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
                <div className="mb-12">
                    <div className="flex items-center justify-center">
                        {/* Shopping bag icon animation */}
                        <div className="relative">
                            <svg
                                className="w-24 h-24 text-blue-600 animate-pulse"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 4h2l3.6 7.59L5.25 14C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.12-1.48-.88-1.48H5.21l-.67-1.43c-.16-.35-.52-.57-.9-.57H1v2zm16 14c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Loading text */}
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-1">{message}</p>
                    <p className="text-gray-500 dark:text-gray-400">{Math.round(progress)}%</p>
                </div>
            </div>)}

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <section className="text-gray-600 body-font ml-20 cursor-pointer">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products && products.map((product: ProductDetails, index: number) => (
                            <div key={index} id={product.id.toString()} onClick={() => handleProdDetails(product.id)} className="lg:w-1/4 md:w-1/2 p-4 w-full ">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img
                                        alt="ecommerce"
                                        className="object-cover object-center w-full h-full"
                                        style={{ objectFit: 'contain' }}
                                        src={product.thumbnail || 'https://dummyimage.com/420x260'}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                        {product.category || 'CATEGORY'}
                                    </h3>
                                    <p className="text-gray-900 title-font  font-medium">
                                        {product.title || 'Product Name'}
                                    </p>
                                    <p className="mt-1 text-2xl text-black">${product.price || '0.00'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Landing_page_section
