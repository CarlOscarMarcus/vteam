import { useAuth } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const { loggedIn, isAdmin, loadingUser } = useAuth()

    if (loadingUser) {
        return <p>Laddar användare...</p>
    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet/>;
}