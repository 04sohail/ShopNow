import { ChevronDown, LogOut, Package, ShoppingBag, User, Users } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { get_all_users_count, get_all_active_users, get_all_in_active_users } from '../services/admin/user_controller';
import { get_all_products_count, get_all_active_products, get_all_in_active_products } from '../services/admin/products_controller';
import Admin_sidebar from '../components/Admin_sidebar';

const Admin_home = () => {

    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState('home');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const [totalUser, setTotalUser] = useState(0);
    const [activeUser, setActiveUser] = useState(0);
    const [inactiveUser, setInactiveUser] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [activeProduct, setActiveProduct] = useState(0);
    const [inactiveProduct, setInactiveProduct] = useState(0);

    const user = JSON.parse(sessionStorage.getItem("logged_in_user") || "{}");

    // INITIAL DATA FETCHING
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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
                console.error('Error fetching data:', error);
                toast.error('Failed to load dashboard data.', { position: 'top-center' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // STATS
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
    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
    const productData = [
        { name: 'Active Products', value: stats.activeProducts },
        { name: 'Removed Products', value: stats.removedProducts }
    ];

    // LOGOUT
    const handleLogout = () => {
        sessionStorage.removeItem("logged_in_user");
        setIsProfileDropdownOpen(false);
        navigate("/login");
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
                {/* Sidebar */}
                <Admin_sidebar className="w-full sm:w-56 lg:w-64 bg-indigo-800 text-white shrink-0" />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="bg-white shadow-sm py-4 px-4 sm:px-6 w-full flex justify-between items-center">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {activePage === 'home' ? "Dashboard" : "Admin Page"}
                        </h2>
                        <div className="relative">
                            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center">
                                <User size={20} className="sm:h-6 sm:w-6" />
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                            {isProfileDropdownOpen && (
                                <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-48 sm:w-64 bg-white shadow-lg rounded-lg">
                                    {/* Profile Info */}
                                    <div className="p-4">
                                        <p className="text-sm font-semibold">{user.first_name} {user.last_name}</p>
                                        <p className="text-xs sm:text-sm text-gray-500">{user.email_address}</p>
                                    </div>
                                    <hr />
                                    <button
                                        className="w-full text-red-500 text-sm sm:text-base p-2 hover:bg-gray-100 rounded"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-indigo-600"></div>
                            </div>
                        ) : (
                           <div className="space-y-6 w-full mt-12 mb-20">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : (
                                <>
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
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                            isAnimationActive={true}
                                                            animationBegin={0}
                                                            animationDuration={1500}
                                                            animationEasing="ease-in-out"
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
                                                            isAnimationActive={true}
                                                            animationBegin={0}
                                                            animationDuration={1500}
                                                            animationEasing="ease-in-out"
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
                                </>
                            )}
                        </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer className="body-font">
                <div className="container px-5 py-8 flex justify-center items-center">
                    <div className="flex items-center">
                        <ShoppingBag className="h-8 w-8 ml-10 mr-1" />
                        <h4 className="font-bold">ShopNow</h4>
                        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                            © 2025 ShopNow —
                            <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@sohail</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Admin_home;
