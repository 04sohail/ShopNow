import { useEffect, useState } from 'react';
import {
    Home,
    Users,
    ShoppingBag,
    Search,
    User,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Package,
    Menu,
    X
} from 'lucide-react';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { get_all_users, get_all_users_count, get_all_active_users, get_all_in_active_users, delete_user_by_id } from '../services/admin/user_controller';
import { get_all_products_count, get_all_active_products, get_all_in_active_products } from '../services/admin/products_controller';
import { AdminUsers } from '../types/types';
import { Link } from 'react-router-dom';


export default function AdminDashboard() {
    // State variables
    const [users, setUsers] = useState<AdminUsers[]>([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [activeUser, setActiveUser] = useState(0);
    const [inactiveUser, setInactiveUser] = useState(0);
    const [activeProduct, setActiveProduct] = useState(0);
    const [inactiveProduct, setInactiveProduct] = useState(0);

    // Fetch all required data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await get_all_users();
                setUsers(userResponse);

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

    console.log(users[0]?.first_name);

    const stats = {
        totalUsers: totalUser,
        activeUsers: activeUser,
        inactiveUsers: inactiveUser,
        totalProducts: totalProduct,
        activeProducts: activeProduct,
        removedProducts: inactiveProduct,
    };
    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
    const userData = [
        { name: 'Active Users', value: stats.activeUsers },
        { name: 'Inactive Users', value: stats.inactiveUsers }
    ];

    const productData = [
        { name: 'Active Products', value: stats.activeProducts },
        { name: 'Removed Products', value: stats.removedProducts }
    ];
    // State for active page
    const [activePage, setActivePage] = useState('home');

    // State for mobile menu
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // User data
    console.log(users);

    // Dummy product data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Premium Headphones',
            category: 'Electronics',
            price: 199.99,
            stock: 45,
            sku: 'HDPH-001',
            brand: 'SoundMax',
            description: 'Wireless noise-cancelling headphones with premium sound quality',
            imageUrl: '/images/headphones.jpg'
        },
        {
            id: 2,
            name: 'Smart Watch Pro',
            category: 'Electronics',
            price: 249.99,
            stock: 32,
            sku: 'SWTC-002',
            brand: 'TechGear',
            description: 'Advanced smartwatch with health monitoring and GPS',
            imageUrl: '/images/smartwatch.jpg'
        },
        {
            id: 3,
            name: 'Designer Handbag',
            category: 'Fashion',
            price: 499.99,
            stock: 15,
            sku: 'HNBG-003',
            brand: 'LuxStyle',
            description: 'Premium leather designer handbag with gold accents',
            imageUrl: '/images/handbag.jpg'
        },
        {
            id: 4,
            name: 'Gaming Laptop',
            category: 'Electronics',
            price: 1299.99,
            stock: 8,
            sku: 'GMLP-004',
            brand: 'PowerPlay',
            description: 'High-performance gaming laptop with RGB keyboard',
            imageUrl: '/images/gaming_laptop.jpg'
        },
        {
            id: 5,
            name: 'Premium Coffee Maker',
            category: 'Kitchen',
            price: 129.99,
            stock: 23,
            sku: 'CFMK-005',
            brand: 'BrewMaster',
            description: 'Programmable coffee maker with thermal carafe',
            imageUrl: '/images/coffee_maker.jpg'
        },
        {
            id: 6,
            name: 'Fitness Tracker',
            category: 'Electronics',
            price: 89.99,
            stock: 54,
            sku: 'FTTK-006',
            brand: 'ActiveLife',
            description: 'Waterproof fitness tracker with heart rate monitor',
            imageUrl: '/images/fitness_tracker.jpg'
        },
        {
            id: 7,
            name: 'Wireless Earbuds',
            category: 'Electronics',
            price: 129.99,
            stock: 37,
            sku: 'WRLS-007',
            brand: 'SoundMax',
            description: 'True wireless earbuds with charging case',
            imageUrl: '/images/earbuds.jpg'
        },
        {
            id: 8,
            name: 'Chef\'s Knife Set',
            category: 'Kitchen',
            price: 199.99,
            stock: 19,
            sku: 'CFKN-008',
            brand: 'CulinaryPro',
            description: 'Professional 8-piece kitchen knife set',
            imageUrl: '/images/knife_set.jpg'
        },
        {
            id: 9,
            name: 'Leather Wallet',
            category: 'Fashion',
            price: 59.99,
            stock: 62,
            sku: 'LWLT-009',
            brand: 'LuxStyle',
            description: 'Genuine leather wallet with RFID protection',
            imageUrl: '/images/wallet.jpg'
        },
        {
            id: 10,
            name: 'Portable Speaker',
            category: 'Electronics',
            price: 79.99,
            stock: 41,
            sku: 'SPKR-010',
            brand: 'SoundMax',
            description: 'Waterproof bluetooth speaker with 20-hour battery life',
            imageUrl: '/images/speaker.jpg'
        },
        {
            id: 11,
            name: 'Yoga Mat',
            category: 'Fitness',
            price: 39.99,
            stock: 75,
            sku: 'YOGA-011',
            brand: 'ActiveLife',
            description: 'Non-slip eco-friendly yoga mat with carry strap',
            imageUrl: '/images/yoga_mat.jpg'
        },
        {
            id: 12,
            name: 'Air Purifier',
            category: 'Home',
            price: 199.99,
            stock: 14,
            sku: 'ARPR-012',
            brand: 'CleanAir',
            description: 'HEPA air purifier for rooms up to 500 sq ft',
            imageUrl: '/images/air_purifier.jpg'
        }
    ]);

    // Pagination state
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const [currentProductPage, setCurrentProductPage] = useState(1);
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

    // Handle user deletion
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const handleDeleteUser = () => {
        if (userToDelete !== null) {
            delete_user_by_id(userToDelete);
            setUsers(users.filter(user => user.id !== userToDelete));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };
    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };
    // DELETE MODAL 
    // Handle product deletion
    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Navigation items
    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, id: 'home' },
        { name: 'Users', icon: <Users size={20} />, id: 'users' },
        { name: 'Products', icon: <ShoppingBag size={20} />, id: 'products' }
    ];

    return (
        <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
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
            )}
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-md bg-indigo-600 text-white"
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
                            <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                                <div className="h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                                    <User size={16} />
                                </div>
                                <span className="font-medium hidden sm:inline">Admin</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 w-full">
                    {/* Dashboard/Home Page */}
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

                    {/* Users Page */}
                    {activePage === 'users' && (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Users List</h3>
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition">
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
                                            <tr className="hover:bg-gray-50" key={user.id}>
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
                                                        <button className="text-indigo-600 hover:text-indigo-900">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(user.id)}
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
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
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
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                            }`}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Page */}
                    {activePage === 'products' && (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Products List</h3>
                                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition">
                                        Add New Product
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="relative flex-1 min-w-64">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            className="pl-10 w-full pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>

                                    <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                        <option value="">Filter by Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Kitchen">Kitchen</option>
                                        <option value="Fitness">Fitness</option>
                                        <option value="Home">Home</option>
                                    </select>
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
                                                                {/* Placeholder for product image */}
                                                                <Package size={24} />
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{product.brand}</div>
                                                    <div className="text-sm text-gray-500">{product.category}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
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
                                                        <button className="text-indigo-600 hover:text-indigo-900">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            className="text-red-600 hover:text-red-900">
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
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
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
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                            }`}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>);
}
