import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const location = useLocation();
    const user = JSON.parse(sessionStorage.getItem("logged_in_user") || "{}");
    if (!user?.email_address) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    if (!allowedRoles.includes(user.user_type)) {
        return user.user_type === 'admin'
            ? <Navigate to="/admin" replace />
            : <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
