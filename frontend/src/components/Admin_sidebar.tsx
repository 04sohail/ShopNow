import { Home, Menu, ShoppingBag, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

const Admin_sidebar = () => {
    // Navigation items
    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, id: 'home' },
        { name: 'Users', icon: <Users size={20} />, id: 'users' },
        { name: 'Products', icon: <ShoppingBag size={20} />, id: 'products' }
    ];
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState('');
    
    return (
        <>
            <div className="w-64 md:w-56 lg:w-64 bg-indigo-800 text-white shrink-0" >
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
                    <div className="flex items-center gap-2 p-6 mb-8 cursor-pointer" onClick={() => navigate('/admin/home')}>
                        <div className="flex items-center gap-2 p-6 mb-8">
                            <ShoppingBag className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">ShopNow Admin</h1>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="px-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={async () => {
                                            if (item.id === 'users') {
                                                // setLoading(true);
                                                navigate('/admin/users');
                                            }
                                            else if (item.id === 'products') {
                                                // setLoading(true);
                                                navigate('/admin/products');
                                                setActivePage(item.id);
                                            }
                                            else if (item.id === 'home') {
                                                navigate('/admin/home');
                                            }
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
            </div>
        </>
    )
}

export default Admin_sidebar