import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const user = JSON.parse(sessionStorage.getItem("logged_in_user") || "{}");
    if (user?.email_address && user.email_address.length > 0) {
        return user.user_type === 'admin'
            ? <Navigate to="/admin" replace />
            : <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
