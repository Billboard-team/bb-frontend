import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";

const AuthCallback = () => {
    const { isLoading, error, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate("/");
        }
        if (!isLoading && error) {
            console.error("Auth0 error:", error);
            navigate("/signin?error=auth");
        }
    }, [isLoading, isAuthenticated, error]);

    return (
        <Center minH="100vh">
            <Spinner size="xl" />
        </Center>
    );
};

export default AuthCallback;
