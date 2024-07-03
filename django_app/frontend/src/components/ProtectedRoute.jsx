import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_OAuth, REFRESH_TOKEN_OAuth } from "../constants";
import { useEffect, useState } from "react";
import api from "../api";

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshJwtToken = async () => {
        const refreshToken = localStorage.getItem(JWT_REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const jwtToken = localStorage.getItem(ACCESS_TOKEN);
        const oauthToken = localStorage.getItem(ACCESS_TOKEN_OAuth);

        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;
            if (tokenExpiration < now) {
                await refreshJwtToken();
            } else {
                setIsAuthorized(true);
            }
        } else if (oauthToken) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <>Loading ...</>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;