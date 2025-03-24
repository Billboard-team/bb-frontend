import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const { isAuthenticated, isLoading, error, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Auth0 Status:", { isAuthenticated, isLoading, error, user }); // 🔹 Debugging

        if (!isLoading) {
            if (isAuthenticated) {
                console.log("✅ User Authenticated:", user); // Debug
                navigate("/dashboard");  // Redirect to dashboard
            } else if (error) {
                console.error("❌ Authentication Error:", error);
                navigate("/signin");  // Redirect to login page on failure
            }
        }
    }, [isAuthenticated, isLoading, error, user, navigate]);

    return <p>Processing login...</p>;
};

export default AuthCallback;
