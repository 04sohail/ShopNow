import { useUser } from '../contexts/user/useUser';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useUser();

    // If user is logged in, redirect to the dashboard
    if (user?.email_address && user.email_address.length > 0) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the children (public content)
    return <>{children}</>;
};
