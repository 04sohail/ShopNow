import { useEffect, useRef, useState } from 'react';
import {
    Home,
    Users,
    ShoppingBag,
    User,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Package,
    Menu,
    X,
    Phone,
    Eye,
    EyeOff,
    Mail,
    CheckCircle,
    ChevronDown,
    LogOut
} from 'lucide-react';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { get_all_users, get_all_users_count, get_all_active_users, get_all_in_active_users, delete_user_by_id, add_new_user, get_user_by_id, update_user_by_id } from '../services/admin/user_controller';
import { get_all_products_count, get_all_active_products, get_all_in_active_products, get_all_products, delete_product_by_id, add_new_product } from '../services/admin/products_controller';
import { AdminUsers, ProductDetails, ProductDetailsBody } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { adminUpdateUserSchema, signupSchema, productAddSchema } from '../utils/validations';
import { Bounce, toast, ToastContainer } from 'react-toastify';


export default function AdminDashboard() {
    // State variables
    // DASHBOARD SECTION
    const [users, setUsers] = useState<AdminUsers[]>([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [activeUser, setActiveUser] = useState(0);
    const [inactiveUser, setInactiveUser] = useState(0);
    const [activeProduct, setActiveProduct] = useState(0);
    const [inactiveProduct, setInactiveProduct] = useState(0);
    const [isDeleteModalOpen, setIsUserDeleteModalOpen] = useState(false);

    // ERROR SECTION
    const [submitError, setSubmitError] = useState<string | null>(null);

    // PRODUCT SECTION
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const [showProductDeletedSuccessNotification, setShowProductDeletedSuccessNotification] = useState(false);
    const [showProductAddedSuccessNotification, setShowProductAddedSuccessNotification] = useState(false);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [isProductAddModalOpen, setIsProductAddModalOpen] = useState(false);
    const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] = useState(false);
    // USER SECTION
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [showUserRegisteredSuccessNotification, setShowUserRegisteredSuccessNotification] = useState(false);
    const [showUserDeletedSuccessNotification, setShowUserDeletedSuccessNotification] = useState(false);
    const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
    const [showUserUpdateNotification, setShowUserUpdateNotification] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<number | null>(null);

    // PAGINATION SECTION   
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const [currentProductPage, setCurrentProductPage] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [showPassword, setShowPassword] = useState(false);
    const [isUserUpdateModalOpen, setIsUserUpdateModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();


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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await get_all_users();
                setUsers(userResponse);

                const productResponse = await get_all_products();
                setProducts(productResponse);

                const userCountResponse = await get_all_users_count();
                setTotalUser(userCountResponse);

                const activeUserResponse = await get_all_active_users();
                setActiveUser(activeUserResponse);

                const inactiveUserResponse = await get_all_in_active_users();
                setInactiveUser(inactiveUserResponse);

                const productCountResponse = await get_all_products_count();
                setTotalProduct(productCountResponse);

                const activeProductResponse = await get_all_active_products();
                setActiveProduct(activeProductResponse);

                const inactiveProductResponse = await get_all_in_active_products();
                setInactiveProduct(inactiveProductResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // LOGOUT
    const handleLogout = () => {
        sessionStorage.removeItem("logged_in_user");
        setIsProfileDropdownOpen(false);
        navigate("/login");
    };
    const refreshData = async () => {
        try {

            const userResponse = await get_all_users();
            setUsers(userResponse);

            const productResponse = await get_all_products();
            setProducts(productResponse);

            const userCountResponse = await get_all_users_count();
            setTotalUser(userCountResponse);

            const activeUserResponse = await get_all_active_users();
            setActiveUser(activeUserResponse);

            const inactiveUserResponse = await get_all_in_active_users();
            setInactiveUser(inactiveUserResponse);

            const productCountResponse = await get_all_products_count();
            setTotalProduct(productCountResponse);

            const activeProductResponse = await get_all_active_products();
            setActiveProduct(activeProductResponse);

            const inactiveProductResponse = await get_all_in_active_products();
            setInactiveProduct(inactiveProductResponse);

        } catch (error) {
            console.error("Error refreshing users:", error);
        }
    };



    // ADMIN DASHBOARD
    // PROFILE DOWPDOWN
    const handleOutsideClick = (event: MouseEvent) => {
        if (
            profileDropdownRef.current &&
            !profileDropdownRef.current.contains(event.target as Node)
        ) {
            setIsProfileDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isProfileDropdownOpen]);

    const user = JSON.parse(sessionStorage.getItem("logged_in_user") || "{}");
    // HOME SECTION
    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
    const stats = {
        totalUsers: totalUser,
        activeUsers: activeUser,
        inactiveUsers: inactiveUser,
        totalProducts: totalProduct,
        activeProducts: activeProduct,
        removedProducts: inactiveProduct,
    };
    const userData = [
        { name: 'Active Users', value: stats.activeUsers },
        { name: 'Inactive Users', value: stats.inactiveUsers }
    ];

    const productData = [
        { name: 'Active Products', value: stats.activeProducts },
        { name: 'Removed Products', value: stats.removedProducts }
    ];

    // Product data
    const [products, setProducts] = useState<ProductDetails[]>([] as ProductDetails[]);

    // Pagination state
    const itemsPerPage = 10;
    // Calculate pagination
    const indexOfLastUser = currentUserPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const indexOfLastProduct = currentProductPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page handlers
    const nextUserPage = () => {
        if (currentUserPage < Math.ceil(users.length / itemsPerPage)) {
            setCurrentUserPage(currentUserPage + 1);
        }
    };

    const prevUserPage = () => {
        if (currentUserPage > 1) {
            setCurrentUserPage(currentUserPage - 1);
        }
    };

    const nextProductPage = () => {
        if (currentProductPage < Math.ceil(products.length / itemsPerPage)) {
            setCurrentProductPage(currentProductPage + 1);
        }
    };

    const prevProductPage = () => {
        if (currentProductPage > 1) {
            setCurrentProductPage(currentProductPage - 1);
        }
    };



    // Navigation items
    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, id: 'home' },
        { name: 'Users', icon: <Users size={20} />, id: 'users' },
        { name: 'Products', icon: <ShoppingBag size={20} />, id: 'products' }
    ];

    const errorRef = useRef(null);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // USERS SECTION START //////////////////////////////////////////////////////////////////////////////
    // DELETE USER
    const handleDeleteUser = async () => {
        if (userToDelete !== null) {
            try {
                await delete_user_by_id(userToDelete);
                await refreshData();
                setIsUserDeleteModalOpen(false);
                setUserToDelete(null);
                setShowUserDeletedSuccessNotification(true);
                setTimeout(() => {
                    setShowUserDeletedSuccessNotification(false);
                }, 2000);
            }
            catch (error) {
                console.error("Error deleting user:", error);
            }
        }
        else {
            console.log("User ID is null or undefined.");
        }
    };
    const handleUserDeleteClick = (id: number) => {
        setUserToDelete(id);
        setIsUserDeleteModalOpen(true);
    };
    const handleUserCancelDelete = () => {
        setUserToDelete(null);
        setIsUserDeleteModalOpen(false);
    };
    // USER SIGNUP //
    // USER INITIAL VALUES
    const signupInitialValues = {
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
        mobile_number: "",
        user_type: ""
    };
    // CLOSES USER NOTIFICATION 
    const handleUserCloseNotification = () => {
        setShowUserRegisteredSuccessNotification(false);
        setShowUpdateNotification(false);
        setShowUserDeletedSuccessNotification(false);
        setShowUserUpdateNotification(false);
    };
    // SIGNUP FORMIK
    const signupFormik = useFormik({
        initialValues: signupInitialValues,
        validationSchema: signupSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitError(null);
                // API CALL
                const response = await add_new_user(values);
                if (response.status === 201) {
                    await refreshData();
                    setIsUserAddModalOpen(false);
                    setShowUserRegisteredSuccessNotification(true);
                    setTimeout(() => {
                        setShowUserRegisteredSuccessNotification(false);
                    }, 2000);
                    resetForm();
                }
            } catch (error) {
                console.error("Error during login:", error);
                if ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail) {
                    setSubmitError((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "An unexpected error occurred."); // Set backend message
                } else {
                    setSubmitError("An unexpected error occurred. Please try again.");
                }
            } finally {
                setSubmitting(false);
            }
        }
    });
    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signupFormik.setTouched({
            first_name: true,
            last_name: true,
            email_address: true,
            password: true,
            mobile_number: true,
            user_type: true
        });
        setTimeout(() => {
            signupFormik.handleSubmit();
        }, 0);
    };

    // UPDATING USER //
    const updateInitialValues = {
        first_name: "",
        last_name: "",
        email_address: "",
        mobile_number: "",
        user_type: ""
    };

    const updateFormik = useFormik({
        initialValues: updateInitialValues,
        validationSchema: adminUpdateUserSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitError(null);
                // API CALL // 
                const response = await update_user_by_id(userToUpdate!, values);
                if (response.data.status_code === 200) {
                    setIsUserUpdateModalOpen(false);
                    resetForm()
                    await refreshData();
                    setShowUserUpdateNotification(true);
                    setTimeout(() => {
                        setShowUserUpdateNotification(false);
                        setIsUserUpdateModalOpen(false);
                    }, 2000);
                }
            } catch (error) {
                if ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail) {
                    const detail = (error as { response?: { data?: { detail?: string } } }).response?.data?.detail;

                    if (detail?.includes("Email")) {
                        updateFormik.setFieldError("email_address", detail);
                    } else if (detail?.includes("Mobile")) {
                        updateFormik.setFieldError("mobile_number", detail);
                    } else {
                        setSubmitError(detail!);
                    }
                }

            } finally {
                setSubmitting(false);
            }
        }
    });
    const handleEditClick = async (id: number) => {
        const response = await get_user_by_id(id)
        updateFormik.setValues({
            first_name: response.first_name,
            last_name: response.last_name,
            email_address: response.email_address,
            mobile_number: response.mobile_number,
            user_type: response.user_type
        });
        setUserToUpdate(id);
        setIsUserUpdateModalOpen(true);
    };
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        signupFormik.setTouched({
            first_name: true,
            last_name: true,
            email_address: true,
            password: true,
            mobile_number: true,
            user_type: true
        });
        setTimeout(() => {
            updateFormik.handleSubmit();
        }, 0);
    };
    // USERS SECTION END //////////////////////////////////////////////////////////////////////////////

    // PRODUCT SECTION START //////////////////////////////////////////////////////////////////////////////
    // CLOSES PRODUCTS NOTIFICATION 
    const handleProductCloseNotification = () => {
        setShowProductDeletedSuccessNotification(false);
        setShowProductAddedSuccessNotification(false);
        setShowUpdateNotification(false);
    };

    // PRODUCTS ADD
    const productInitialValues: ProductDetailsBody = {
        title: '',
        description: '',
        category: '',
        price: '',
        images: [''],
        thumbnail: '',
        discountpercentage: '',
        rating: '',
        stock: '',
        brand: '',
        warrantyinformation: '',
        shippinginformation: '',
        availabilitystatus: '',
        returnpolicy: ''
    }
    const productAddFormik = useFormik({
        initialValues: productInitialValues,
        validationSchema: productAddSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitError(null);
                const response = await add_new_product(values);
                if (response === 201) {
                    setIsProductAddModalOpen(false);
                    resetForm();
                    await refreshData();
                    setShowProductAddedSuccessNotification(true);
                    setTimeout(() => {
                        setShowProductAddedSuccessNotification(false);
                    }, 2000);
                }

            } catch (error) {
                console.error("Error during login:", error);
                // Handle backend error messages
                if ((error as { response?: { data?: { detail?: string } } }).response?.data?.detail) {
                    setSubmitError((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "An unexpected error occurred.");
                } else {
                    setSubmitError("An unexpected error occurred. Please try again.");
                }
            } finally {
                setSubmitting(false);
            }
        }
    });
    // PRODUCT DELETE 
    const handleProductDeleteClick = (id: number) => {
        setProductToDelete(id);
        setIsProductDeleteModalOpen(true);
    }
    const handleProductCancelDelete = () => {
        setProductToDelete(null);
        setIsProductDeleteModalOpen(false);
    };
    const handleProductDelete = async () => {
        if (productToDelete !== null) {
            try {
                const response = await delete_product_by_id(productToDelete);
                if (response.status_code === 200) {
                    await refreshData();
                    setIsProductDeleteModalOpen(false);
                    setProductToDelete(null);
                    setShowProductDeletedSuccessNotification(true);
                    setTimeout(() => {
                        setShowProductDeletedSuccessNotification(false);
                    }, 2000);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        } else {
            console.log("Product ID is null or undefined.");
        }
    };
    return (
        <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
            {/* Toast */}
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
            {/* USER NOTIFICATIONS START*/}
            {showUserRegisteredSuccessNotification && (
                <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md transform transition-all duration-300 ease-in-out z-100">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-medium text-green-800">Registration Successful!</p>
                        </div>
                        <button
                            onClick={handleUserCloseNotification}
                            className="text-green-500 hover:text-green-700 ml-2 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            {showUserDeletedSuccessNotification && (
                <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md transform transition-all duration-300 ease-in-out z-100">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-medium text-green-800">User Deleted Successfully!</p>
                        </div>
                        <button
                            onClick={handleUserCloseNotification}
                            className="text-green-500 hover:text-green-700 ml-2 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            {showUserUpdateNotification && (
                <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md transform transition-all duration-300 ease-in-out z-100">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-medium text-green-800">User Updated Successfully!</p>
                        </div>
                        <button
                            onClick={handleUserCloseNotification}
                            className="text-green-500 hover:text-green-700 ml-2 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            {/* USER NOTIFICATIONS END */}
            {/* PRODUCTS NOTIFICATIONS START */}
            {showProductAddedSuccessNotification && (
                <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md transform transition-all duration-300 ease-in-out z-100">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-medium text-green-800">Product Added Successfully!</p>
                        </div>
                        <button
                            onClick={handleProductCloseNotification}
                            className="text-green-500 hover:text-green-700 ml-2 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            {showProductDeletedSuccessNotification && (
                <div className="fixed top-4 left-0 right-0 mx-auto w-full max-w-md transform transition-all duration-300 ease-in-out z-100">
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-4 mx-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="font-medium text-green-800">Product Deleted Successfully!</p>
                        </div>
                        <button
                            onClick={handleProductCloseNotification}
                            className="text-green-500 hover:text-green-700 ml-2 focus:outline-none cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            {/* PRODUCTS NOTIFICATIONS END */}
            {/* USER ADD MODAL START */}
            {isUserAddModalOpen && (
                <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto p-5">
                        <div className="flex justify-between items-center p-4 border-b mb-5">
                            <h2 className="text-xl font-semibold text-gray-800">Create Account</h2>
                            <button onClick={() => setIsUserAddModalOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>
                        {submitError && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {submitError}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSignupSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        className={`block w-full rounded-lg border ${signupFormik.touched.first_name && signupFormik.errors.first_name
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                        placeholder="First Name"
                                        value={signupFormik.values.first_name}
                                        onChange={signupFormik.handleChange}
                                        onBlur={signupFormik.handleBlur}
                                    />
                                    {signupFormik.touched.first_name && signupFormik.errors.first_name && (
                                        <p className="mt-1 text-sm text-red-600">{signupFormik.errors.first_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        className={`block w-full rounded-lg border ${signupFormik.touched.last_name && signupFormik.errors.last_name
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                        placeholder="Last Name"
                                        value={signupFormik.values.last_name}
                                        onChange={signupFormik.handleChange}
                                        onBlur={signupFormik.handleBlur}
                                    />
                                    {signupFormik.touched.last_name && signupFormik.errors.last_name && (
                                        <p className="mt-1 text-sm text-red-600">{signupFormik.errors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email_address"
                                        name="email_address"
                                        type="text"
                                        autoComplete="email"
                                        className={`pl-10 block w-full rounded-lg border ${signupFormik.touched.email_address && signupFormik.errors.email_address
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                                        placeholder="Email Address"
                                        value={signupFormik.values.email_address}
                                        onChange={signupFormik.handleChange}
                                        onBlur={signupFormik.handleBlur}
                                    />
                                </div>
                                {signupFormik.touched.email_address && signupFormik.errors.email_address && (
                                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.email_address}</p>
                                )}
                                <p className="text-red-600 text-sm mt-1 hidden" ref={errorRef}>User Already Exists</p>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        className={`block w-full rounded-lg border ${signupFormik.touched.password && signupFormik.errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                        placeholder="Password"
                                        value={signupFormik.values.password}
                                        onChange={signupFormik.handleChange}
                                        onBlur={signupFormik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {signupFormik.touched.password && signupFormik.errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="mobile_number"
                                        name="mobile_number"
                                        type="tel"
                                        maxLength={10}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        className={`pl-10 block w-full rounded-lg border ${signupFormik.touched.mobile_number && signupFormik.errors.mobile_number
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                                        placeholder="Phone Number"
                                        value={signupFormik.values.mobile_number}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            signupFormik.setFieldValue('mobile_number', value);
                                        }}
                                        onBlur={signupFormik.handleBlur}
                                    />
                                </div>
                                {signupFormik.touched.mobile_number && signupFormik.errors.mobile_number && (
                                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.mobile_number}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                                <select
                                    id="user_type"
                                    name="user_type"
                                    className={`block w-full rounded-lg border ${signupFormik.touched.user_type && signupFormik.errors.user_type
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    value={signupFormik.values.user_type}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                >
                                    <option value="" disabled>Select User Type</option>
                                    <option value="admin">Admin</option>
                                    <option value="free-user">Free User</option>
                                </select>
                                {signupFormik.touched.user_type && signupFormik.errors.user_type && (
                                    <p className="mt-1 text-sm text-red-600">{signupFormik.errors.user_type}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={signupFormik.isSubmitting}
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-150 ease-in-out cursor-pointer disabled:opacity-70"
                                >
                                    {signupFormik.isSubmitting ? "Creating Account..." : "Create Account"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )
            }
            {/* USER ADD MODAL END */}

            {/* USER DELETE MODAL START */}
            {
                isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">
                        <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to delete this User? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleUserCancelDelete}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* USER DELETE MODAL END */}

            {/* USER UPDATE MODAL START */}
            {
                isUserUpdateModalOpen && (
                    <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto p-5">
                            <div className="flex justify-between items-center p-4 border-b mb-5">
                                <h2 className="text-xl font-semibold text-gray-800">Update User</h2>
                                <button onClick={() => setIsUserUpdateModalOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                    <X size={24} />
                                </button>
                            </div>
                            {submitError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {submitError}
                                </div>
                            )}
                            <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            className={`block w-full rounded-lg border ${updateFormik.touched.first_name && updateFormik.errors.first_name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500'
                                                } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                            placeholder="First Name"
                                            value={updateFormik.values.first_name}
                                            onChange={updateFormik.handleChange}
                                            onBlur={updateFormik.handleBlur}
                                        />
                                        {updateFormik.touched.first_name && updateFormik.errors.first_name && (
                                            <p className="mt-1 text-sm text-red-600">{updateFormik.errors.first_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            className={`block w-full rounded-lg border ${updateFormik.touched.last_name && updateFormik.errors.last_name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500'
                                                } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                            placeholder="Last Name"
                                            value={updateFormik.values.last_name}
                                            onChange={updateFormik.handleChange}
                                            onBlur={updateFormik.handleBlur}
                                        />
                                        {updateFormik.touched.last_name && updateFormik.errors.last_name && (
                                            <p className="mt-1 text-sm text-red-600">{updateFormik.errors.last_name}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email_address"
                                            name="email_address"
                                            type="text"
                                            autoComplete="email"
                                            className={`pl-10 block w-full rounded-lg border ${updateFormik.touched.email_address && updateFormik.errors.email_address
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500'
                                                } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                                            placeholder="Email Address"
                                            value={updateFormik.values.email_address}
                                            onChange={updateFormik.handleChange}
                                            onBlur={updateFormik.handleBlur}
                                        />
                                    </div>
                                    {updateFormik.touched.email_address && updateFormik.errors.email_address && (
                                        <p className="mt-1 text-sm text-red-600">{updateFormik.errors.email_address}</p>
                                    )}
                                    <p className="text-red-600 text-sm mt-1 hidden" ref={errorRef}>User Already Exists</p>
                                </div>

                                <div>
                                    <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="mobile_number"
                                            name="mobile_number"
                                            type="tel"
                                            maxLength={10}
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className={`pl-10 block w-full rounded-lg border ${updateFormik.touched.mobile_number && updateFormik.errors.mobile_number
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:ring-indigo-500'
                                                } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                                            placeholder="Phone Number"
                                            value={updateFormik.values.mobile_number}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                updateFormik.setFieldValue('mobile_number', value);
                                            }}
                                            onBlur={updateFormik.handleBlur}
                                        />
                                    </div>
                                    {updateFormik.touched.mobile_number && updateFormik.errors.mobile_number && (
                                        <p className="mt-1 text-sm text-red-600">{updateFormik.errors.mobile_number}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                                    <select
                                        id="user_type"
                                        name="user_type"
                                        className={`block w-full rounded-lg border ${updateFormik.touched.user_type && updateFormik.errors.user_type
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-indigo-500'
                                            } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                        value={updateFormik.values.user_type}
                                        onChange={updateFormik.handleChange}
                                        onBlur={updateFormik.handleBlur}
                                    >
                                        <option value="" disabled>Select User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="free_user">Free User</option>
                                    </select>
                                    {updateFormik.touched.user_type && updateFormik.errors.user_type && (
                                        <p className="mt-1 text-sm text-red-600">{updateFormik.errors.user_type}</p>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={updateFormik.isSubmitting}
                                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-150 ease-in-out cursor-pointer disabled:opacity-70"
                                    >
                                        {updateFormik.isSubmitting ? "Updating User..." : "Update User"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {/* USER UPDATE MODAL END */}

            {/* PRODUCT DELETE MODAL START */}
            {
                isProductDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">
                        <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to delete this User? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleProductCancelDelete}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProductDelete}
                                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* PRODUCT DELETE MODAL END */}


            {/* PRODUCT ADD MODAL START*/}
            {isProductAddModalOpen && (
                <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto p-5">
                        <div className="flex justify-between items-center p-4 border-b mb-5">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Product Here</h2>
                            <button onClick={handleProductCloseNotification} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>
                        {submitError && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {submitError}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={productAddFormik.handleSubmit}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.title && productAddFormik.errors.title
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Title"
                                    value={productAddFormik.values.title}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.title && productAddFormik.errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.title}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.description && productAddFormik.errors.description
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Description"
                                    value={productAddFormik.values.description}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.description && productAddFormik.errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={productAddFormik.values.category}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                    className={`pl-2 block w-full rounded-lg border cursor-pointer ${productAddFormik.touched.category && productAddFormik.errors.category
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 text-gray-900 focus:outline-none focus:ring-2`}
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="fragrances">Fragnances</option>
                                    <option value="furniture">Furniture</option>
                                    <option value="groceries">Groceries</option>
                                </select>
                                {productAddFormik.touched.category && productAddFormik.errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.price && productAddFormik.errors.price
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Price"
                                    value={productAddFormik.values.price}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.price && productAddFormik.errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.price}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                                <input
                                    id="images"
                                    name="images"
                                    type="url"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.images && productAddFormik.errors.images
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Images"
                                    value={productAddFormik.values.images[0]}
                                    onChange={(e) => productAddFormik.setFieldValue('images', [e.target.value])}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.images && productAddFormik.errors.images && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.images}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                                <input
                                    id="thumbnail"
                                    name="thumbnail"
                                    type="url"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.thumbnail && productAddFormik.errors.thumbnail
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Thumbnail"
                                    value={productAddFormik.values.thumbnail}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.thumbnail && productAddFormik.errors.thumbnail && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.thumbnail}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="discountpercentage" className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (0-100)</label>
                                <input
                                    id="discountpercentage"
                                    name="discountpercentage"
                                    type="number"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.discountpercentage && productAddFormik.errors.discountpercentage
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Discount Percentage"
                                    value={productAddFormik.values.discountpercentage}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.discountpercentage && productAddFormik.errors.discountpercentage && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.discountpercentage}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                                <input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    step="0.01"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.rating && productAddFormik.errors.rating
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Rating"
                                    value={productAddFormik.values.rating}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.rating && productAddFormik.errors.rating && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.rating}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.stock && productAddFormik.errors.stock
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Stock"
                                    value={productAddFormik.values.stock}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.stock && productAddFormik.errors.stock && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.stock}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input
                                    id="brand"
                                    name="brand"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.brand && productAddFormik.errors.brand
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Brand"
                                    value={productAddFormik.values.brand}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.brand && productAddFormik.errors.brand && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.brand}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="warrantyinformation" className="block text-sm font-medium text-gray-700 mb-1">Warranty Information</label>
                                <input
                                    id="warrantyinformation"
                                    name="warrantyinformation"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.warrantyinformation && productAddFormik.errors.warrantyinformation
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Warranty Information"
                                    value={productAddFormik.values.warrantyinformation}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.warrantyinformation && productAddFormik.errors.warrantyinformation && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.warrantyinformation}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="shippinginformation" className="block text-sm font-medium text-gray-700 mb-1">Shipping Information</label>
                                <input
                                    id="shippinginformation"
                                    name="shippinginformation"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.shippinginformation && productAddFormik.errors.shippinginformation
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Shipping Information"
                                    value={productAddFormik.values.shippinginformation}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.shippinginformation && productAddFormik.errors.shippinginformation && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.shippinginformation}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="availabilitystatus" className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                                <input
                                    id="availabilitystatus"
                                    name="availabilitystatus"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.availabilitystatus && productAddFormik.errors.availabilitystatus
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Availability Status"
                                    value={productAddFormik.values.availabilitystatus}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.availabilitystatus && productAddFormik.errors.availabilitystatus && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.availabilitystatus}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="returnpolicy" className="block text-sm font-medium text-gray-700 mb-1">Return Policy</label>
                                <input
                                    id="returnpolicy"
                                    name="returnpolicy"
                                    type="text"
                                    className={`block w-full rounded-lg border ${productAddFormik.touched.returnpolicy && productAddFormik.errors.returnpolicy
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-indigo-500'
                                        } py-2 px-3 text-gray-900 focus:outline-none focus:ring-2`}
                                    placeholder="Return Policy"
                                    value={productAddFormik.values.returnpolicy}
                                    onChange={productAddFormik.handleChange}
                                    onBlur={productAddFormik.handleBlur}
                                />
                                {productAddFormik.touched.returnpolicy && productAddFormik.errors.returnpolicy && (
                                    <p className="mt-1 text-sm text-red-600">{productAddFormik.errors.returnpolicy}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={productAddFormik.isSubmitting}
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-150 ease-in-out cursor-pointer disabled:opacity-70"
                                >
                                    {productAddFormik.isSubmitting ? "Adding Product..." : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* PRODUCT ADD MODAL END*/}

            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-md bg-indigo-600 text-white cursor-pointer"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`bg-indigo-800 text-white w-64 shrink-0 ${mobileMenuOpen ? 'fixed z-40 h-full md:relative' : 'hidden md:block'}`}>
                {/* Logo */}
                <Link to="/admin" className="flex items-center gap-2 p-6 mb-8">
                    <div className="flex items-center gap-2 p-6 mb-8">
                        <ShoppingBag className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">ShopNow Admin</h1>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="px-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        setActivePage(item.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors cursor-pointer ${activePage === item.id
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden w-full max-w-full">
                {/* Top Header */}
                <header className="bg-white shadow-sm py-4 px-6 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {navItems.find(item => item.id === activePage)?.name || "Dashboard"}
                        </h2>
                        <div className="flex items-center gap-4">
                            {/* Profile */}
                            <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                                <div className="flex items-center cursor-pointer">
                                    <User size={24} />
                                    <ChevronDown className="ml-1" size={16} />
                                </div>
                                {isProfileDropdownOpen && (
                                    <div
                                        ref={profileDropdownRef}
                                        className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="mb-4">
                                            <h2 className="text-sm font-semibold text-gray-800">
                                                {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}{" "}
                                                {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
                                            </h2>
                                            <p className="text-sm text-gray-500">{user.email_address}</p>
                                        </div>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center text-left text-sm cursor-pointer text-red-500 hover:bg-gray-100 p-2 rounded"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 w-full">
                    {/* DASHBOARD / HOME PAGE START*/}
                    {activePage === 'home' && (
                        <div className="space-y-6 w-full">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 w-full">
                                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 w-full">
                                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                                        <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Row - Pie Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Users Pie Chart */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">User Status</h3>
                                    <div className="h-72 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={userData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={90}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {userData.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `${value} users`} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                                        <div>Total Users: {stats.totalUsers}</div>
                                        <div>Active: {stats.activeUsers}</div>
                                        <div>Inactive: {stats.inactiveUsers}</div>
                                    </div>
                                </div>

                                {/* Products Pie Chart */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Product Status</h3>
                                    <div className="h-72 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={productData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={90}
                                                    fill="#8884d8"
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {productData.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `${value} products`} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                                        <div>Total Products: {stats.totalProducts}</div>
                                        <div>Active: {stats.activeProducts}</div>
                                        <div>Removed: {stats.removedProducts}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* DASHBOARD / HOME PAGE END*/}

                    {/* USERS PAGE START */}
                    {activePage === 'users' && (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Users List</h3>
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition cursor-pointer" onClick={() => setIsUserAddModalOpen(true)}>
                                        Add New User
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentUsers.map((user) => (
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                            {user?.first_name.charAt(0)}{user?.last_name.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user?.first_name} {user?.last_name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{user.email_address}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{user.mobile_number}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => handleEditClick(user.id)}>
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleUserDeleteClick(user.id)}
                                                            className="text-red-600 hover:text-red-900 cursor-pointer">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">
                                        {indexOfLastUser > users.length ? users.length : indexOfLastUser}
                                    </span> of <span className="font-medium">{users.length}</span> users
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevUserPage}
                                        disabled={currentUserPage === 1}
                                        className={`p-2 rounded-md border ${currentUserPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer'
                                            }`}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-sm text-gray-700">Page {currentUserPage}</span>
                                    <button
                                        onClick={nextUserPage}
                                        disabled={currentUserPage >= Math.ceil(users.length / itemsPerPage)}
                                        className={`p-2 rounded-md border ${currentUserPage >= Math.ceil(users.length / itemsPerPage)
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer'
                                            }`}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* USERS PAGE END */}

                    {/* PRODUCTS PAGE START */}
                    {activePage === 'products' && (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Products List</h3>
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition cursor-pointer" onClick={() => setIsProductAddModalOpen(true)}>
                                        Add New Product
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                                                            <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs">
                                                                <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{product.brand}</div>
                                                    <div className="text-sm text-gray-500">{product.category}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">${product.price}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${product.stock > 20
                                                        ? 'bg-green-100 text-green-800'
                                                        : product.stock > 10
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.stock} in stock
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleProductDeleteClick(product.id)}
                                                            className="text-red-600 hover:text-red-900 cursor-pointer">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">
                                        {indexOfLastProduct > products.length ? products.length : indexOfLastProduct}
                                    </span> of <span className="font-medium">{products.length}</span> products
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevProductPage}
                                        disabled={currentProductPage === 1}
                                        className={`p-2 rounded-md border ${currentProductPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer'
                                            }`}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-sm text-gray-700">Page {currentProductPage}</span>
                                    <button
                                        onClick={nextProductPage}
                                        disabled={currentProductPage >= Math.ceil(products.length / itemsPerPage)}
                                        className={`p-2 rounded-md border ${currentProductPage >= Math.ceil(products.length / itemsPerPage)
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer'
                                            }`}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* PRODUCTS PAGE END */}
                </main>
            </div>
        </div >);
}
