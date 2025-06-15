import { Home, ShoppingBag, Users } from 'lucide-react';
import { Bounce, ToastContainer } from 'react-toastify';
import Admin_sidebar from '../components/Admin_sidebar';


const Admin_products = () => {
    // Navigation items
    const navItems = [
        { name: 'Dashboard', icon: <Home size={20} />, id: 'home' },
        { name: 'Users', icon: <Users size={20} />, id: 'users' },
        { name: 'Products', icon: <ShoppingBag size={20} />, id: 'products' }
    ];
    return (
        <>
            <Admin_sidebar />
        </>
    )
}

export default Admin_products