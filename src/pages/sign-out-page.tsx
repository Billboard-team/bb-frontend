import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignOutPage = () => {
    const { logout } = useAuth0();

    useEffect(() => {
        logout({
            logoutParams: {
                returnTo: window.location.origin + "/signin", 
            },
        });
    }, [logout]);

    return null; // or <p>Logging out...</p>
};

export default SignOutPage;
