import { Trash2, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../types/types';
import { removeCart, updateQuantity } from '../redux/Slice';
import { Link } from 'react-router-dom';

export default function Cart_section() {
    const dispatch = useDispatch();
    // Listen to the entire redux state directly
    const cartItems = useSelector((state: { carts: CartItem[] }) => state.carts.filter(item => item.id !== 0));

    // Removing item from cart
    const handleRemoveCart = (event: React.FormEvent, id: number) => {
        event.preventDefault();
        dispatch(removeCart({ id: id }));
    };

    const handleUpdateQuantity = (id: number, amount: number) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + amount);
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const calculateSubtotal = (): number => {
        return Number(cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2));
    };

    const subtotal = calculateSubtotal();
    const tax: number = parseFloat((subtotal * 0.08).toFixed(2));
    const shipping = 9.99;
    const total = (subtotal + tax + shipping).toFixed(2);

    return (
        <div className='mt-30'>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
                        <p className="text-xl text-gray-500">Your cart is empty</p>
                        <Link to={"/"}>
                            <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <div className="hidden md:grid md:grid-cols-6 text-sm font-medium text-gray-500 mb-3 pb-2 border-b">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4 border-b border-gray-200 items-center">
                                    <div className="col-span-3 flex items-center space-x-4">
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.product.title}</h3>
                                            <p className="text-sm text-gray-500 md:hidden">
                                                ${item.product.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center hidden md:block">
                                        ${item.product.price}
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end">
                                        <span className="font-medium mr-4 md:mr-0">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={(e) => handleRemoveCart(e, item.id)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-1 gap-8">
                            <div className="order-1 md:order-2">
                                <div className="bg-gray-50 p-6 rounded-md">
                                    <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (8%)</span>
                                            <span>${tax}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>${shipping}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2 font-medium text-base flex justify-between">
                                            <span>Total</span>
                                            <span>${total}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}