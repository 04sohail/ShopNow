import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing_Page from '../pages/Landing_Page';
import { PublicRoute } from './Public_routes.tsx';
import { routesConfig } from './Route_Config';
import Invalid_Route from '../pages/Invalid_Route.tsx';
import Product_details from '../pages/Product_details.tsx';
import ShoppingCart from '../pages/ShoppingCart.tsx';
import AuthPage from '../pages/Auth_Page.tsx';
import AdminDashboard from '../pages/Admin.tsx';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path={routesConfig.auth} element={<PublicRoute><AuthPage /></PublicRoute>} />
                <Route path={routesConfig.cart} element={<ShoppingCart />} />
                <Route path={routesConfig.admin} element={<PublicRoute><AdminDashboard /></PublicRoute>} />
                {/* Protected Routes */}
                <Route path={routesConfig.landing} element={<Landing_Page />} />
                <Route path={routesConfig.product_details} element={<Product_details />} />
                {/* Route For Invalid URL's */}
                <Route path={routesConfig.random} element={<Invalid_Route />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
