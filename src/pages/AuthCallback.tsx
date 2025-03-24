import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const { isAuthenticated, isLoading, error, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🧠 Auth0 Status:", {
            isAuthenticated,
            isLoading,
            error,
            user
        });

        if (error) {
            console.error("❌ FULL Auth0 Error:", error);
        }

        if (!isLoading) {
            if (isAuthenticated) {
                console.log("✅ User Authenticated:", user);
                navigate("/dashboard");
            } else {
                console.warn("⚠️ Not authenticated, redirecting to /signin");
                navigate("/signin");
            }
        }
    }, [isAuthenticated, isLoading, error, user, navigate]);


    return <p>Processing login...</p>;
};

export default AuthCallback;
