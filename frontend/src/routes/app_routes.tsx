import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing_Page from '../pages/Landing_Page';
import { PublicRoute } from './Public_routes';
import { ProtectedRoute } from './Protected_routes';
import { routesConfig } from './Route_Config';
import Invalid_Route from '../pages/Invalid_Route';
import Product_details from '../pages/Product_details';
import ShoppingCart from '../pages/ShoppingCart';
import AuthPage from '../pages/Auth_Page';
import AdminDashboard from '../pages/Admin';
import ProductForm from '../pages/demo';
import Admin_users from '../pages/Admin_users';
import Admin_products from '../pages/Admin_products';
import Admin_home from '../pages/Admin_home';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* DEMO ROUTE */}
                <Route path={routesConfig.demo} element={<ProductForm />} />
                {/* AUTH ROUTE */}
                {/* Public Routes */}
                <Route path={routesConfig.auth} element={<PublicRoute><AuthPage /></PublicRoute>} />
                <Route path={routesConfig.cart} element={<ShoppingCart />} />
                <Route path={routesConfig.product_details} element={<Product_details />} />
                <Route path={routesConfig.random} element={<Invalid_Route />} />
                <Route path={routesConfig.landing} element={<Landing_Page />} />
                {/* Protected Routes */}
                {/* Landing Page accessible only by regular users */}
                <Route
                    path={routesConfig.landing}
                    element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <Landing_Page />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Dashboard accessible only by admins */}
                <Route
                    path={routesConfig.admin}
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={routesConfig['admin.home']}
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Admin_home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={routesConfig['admin.users']}
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Admin_users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={routesConfig['admin.products']}
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <Admin_products />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
