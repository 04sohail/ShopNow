import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartItem, LocationState, Product } from "../types/types";
import { addCart } from "../redux/Slice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsSection = (): React.ReactElement => {
    const cartItems = useSelector((state: { carts: CartItem[] }) =>
        state.carts.filter(item => item.id !== 0)
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const location = useLocation();
    const { productId } = useParams<{ productId: string }>();
    const locationState = location.state as LocationState;

    useEffect(() => {
        const productFromState = locationState?.product;
        if (productFromState) {
            setProduct(productFromState);
            setSelectedImage(productFromState.thumbnail);
        } else {
            setError("Product ID not found");
        }
    }, [productId, locationState]);

    const isInCart = cartItems.some(item => item.id === product?.id);

    const handleButtonClick = (): void => {
        if (!product) return;

        if (isInCart) {
            navigate('/cart');
        } else {
            const newCart = {
                id: product.id,
                product: product,
                quantity: quantity
            };

            dispatch(addCart(newCart));
        }
    };

    const calculateDiscountedPrice = (price: number, discountPercentage: number): string => {
        return (price - (price * discountPercentage / 100)).toFixed(2);
    };

    const renderRatingStars = (rating: number): React.ReactElement[] => {
        const stars: React.ReactElement[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24">
                        <defs>
                            <clipPath id="half-star-clip">
                                <rect x="0" y="0" width="12" height="24" />
                            </clipPath>
                        </defs>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        <path clipPath="url(#half-star-clip)" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                );
            }
        }
        return stars;
    };

    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (error) {
        return (
            <div className="container mx-auto px-5 py-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-700">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-5 py-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const discountedPrice = product.discountPercentage > 0
        ? calculateDiscountedPrice(product.price, product.discountPercentage)
        : null;

    return (
        <section className="bg-gray-50 text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-16 mx-auto mt-17">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {/* Product Images Section */}
                    <div className="lg:w-1/2 w-full lg:pr-10">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            {/* Main product image */}
                            <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 h-96 flex items-center justify-center">
                                <img
                                    alt={product.title}
                                    className="object-contain w-full h-full transition-all duration-300 hover:scale-105"
                                    src={selectedImage}
                                />
                                {product.discountPercentage > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                        {Math.round(product.discountPercentage)}% OFF
                                    </div>
                                )}
                            </div>
                            {/* Product image gallery */}
                            <div className="flex flex-wrap -mx-2">
                                {product.images && product.images.map((img, index) => (
                                    <div key={index} className="w-1/4 p-2">
                                        <div
                                            className={`cursor-pointer rounded-md overflow-hidden h-20 transition-all ${selectedImage === img ? 'ring-2 ring-indigo-500' : 'hover:opacity-80'}`}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                alt={`${product.title} - view ${index + 1}`}
                                                className="w-full h-full object-cover object-center"
                                                src={img}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {/* Category and Brand */}
                        <div className="flex items-center mb-4">
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full uppercase">
                                {product.category}
                            </span>
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full uppercase">
                                {product.brand}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h1 className="text-gray-900 text-3xl md:text-4xl font-bold mb-3">
                            {product.title}
                        </h1>

                        {/* Product Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex mr-2">
                                {renderRatingStars(product.rating)}
                            </div>
                            <span className="text-gray-600 ml-1">
                                {product.rating.toFixed(1)} Rating
                            </span>
                            <span className="text-gray-400 mx-2">•</span>
                            <span className={`${product.stock > 10 ? 'text-green-600' : 'text-orange-600'} font-medium`}>
                                {product.stock} in stock
                            </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-baseline mb-6">
                            {product.discountPercentage > 0 && discountedPrice ? (
                                <>
                                    <span className="title-font font-bold text-3xl text-gray-900">
                                        ${discountedPrice}
                                    </span>
                                    <span className="title-font font-medium text-lg text-gray-500 line-through ml-3">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-green-600 text-sm ml-3">
                                        Save ${(product.price - parseFloat(discountedPrice)).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="title-font font-bold text-3xl text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Product Description */}
                        <p className="leading-relaxed mb-6 text-gray-600">
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        {!isInCart && product.stock > 0 && (
                            <div className="flex items-center mb-6">
                                <span className="mr-3 text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                                        disabled={quantity <= 1}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                        </svg>
                                    </button>
                                    <span className="w-12 h-10 flex items-center justify-center text-gray-700 font-medium">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={increaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                                        disabled={quantity >= product.stock}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <div className="flex items-center mb-6">
                            <button
                                className={`flex-1 text-white ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} cursor-pointer py-3 px-6 focus:outline-none rounded-lg font-medium text-lg transition-colors shadow-md flex items-center justify-center`}
                                onClick={handleButtonClick}
                                disabled={product.stock === 0}
                            >
                                {product.stock === 0 ? (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        Out of Stock
                                    </span>
                                ) : isInCart ? (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                        View in Cart
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                        </svg>
                                        Add to Cart
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Product Specifications */}
                        <div className="border-t border-gray-200 py-4">
                            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="text-gray-500 text-sm block">Brand</span>
                                    <span className="font-medium">{product.brand}</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="text-gray-500 text-sm block">Category</span>
                                    <span className="font-medium capitalize">{product.category}</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="text-gray-500 text-sm block">Availability</span>
                                    <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <span className="text-gray-500 text-sm block">Stock</span>
                                    <span className="font-medium">{product.stock} units</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping & Return Info */}
                        <div className="border-t border-gray-200 py-4">
                            <div className="flex items-center mb-3">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700 font-medium">Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700 font-medium">30-day hassle-free returns</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700 font-medium">1-year warranty included</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsSection;