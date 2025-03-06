import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return <Navigate to='/auth/login' replace />
    }


    return children

}