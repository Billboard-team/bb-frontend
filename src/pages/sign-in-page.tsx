import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";  // ✅ Import Auth0 Hook
import GoogleLogo from "@/assets/icons/google.png";
import XLogo from "@/assets/icons/x.png";
import ThemeToggle from "@/components/themetoggle";
import BillboardLogo from "@/assets/icons/Billboard-Logo.png";
import {
    Button,
    Input,
    VStack,
    Text,
    Image,
    Box,
    HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0(); // ✅ Auth0 Hook

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => email.includes("@");
    const validatePassword = (password: string) => password.length >= 8;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
            setError("Please enter a valid email address or password");
            return;
        }

        // TODO: Implement email/password authentication with backend

        console.log("Form submitted:", formData);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box"
            minH="100vh"
            bg="white"
            w="100%"
            h="100%"
            m="0"
            p="0"
            overflow="hidden"
        >
            <Box position="absolute" bottom="20px" left="20px" p={4}>
                <ThemeToggle />
            </Box>
            <Box bg="white" p={8} w={{ base: "90%", md: "500px" }}>
                <Box textAlign="center" mb={10}>
                    <Image src={BillboardLogo} alt="Billboard Logo" mx="auto" maxW="100%" h="auto" />
                </Box>

                {/* ✅ Show authentication status */}
                {isLoading ? (
                    <Text textAlign="center">Loading...</Text>
                ) : isAuthenticated ? (
                    <VStack gap={4} textAlign="center">
                        <Text fontSize="lg">Welcome, {user?.name}!</Text>
                        <Image src={user?.picture} alt="User Profile" borderRadius="full" boxSize="50px" />
                            <Button
                                bg="black"
                                color="white"
                                _hover={{ bg: "gray.800" }}
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            >
                                Logout
                            </Button>
                    </VStack>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <VStack gap={4}>
                                {error && (
                                    <Box p={3} bg="red.100" color="red.500" borderRadius="md" width="100%">
                                        <Text>{error}</Text>
                                    </Box>
                                )}
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    type="email"
                                    border={error ? "2px solid" : "1px solid"}
                                    borderColor={error ? "red.500" : "gray.200"}
                                />
                                <Input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    type="password"
                                    border={error ? "2px solid" : "1px solid"}
                                    borderColor={error ? "red.500" : "gray.200"}
                                />
                                <Button bg="black" width="full" _dark={{ color: "white" }} onClick={handleSubmit}>
                                    Login
                                </Button>
                            </VStack>
                        </form>

                        <Box textAlign="center" w="100%">
                            <Text color="gray.500" my={4}>
                                or
                            </Text>
                        </Box>

                        {/* ✅ Social Logins with Auth0 */}
                        <HStack justify="center" gap={6} mt={4}>
                            <Button onClick={() => loginWithRedirect()} p={0} border="none">
                                <Image src={GoogleLogo} alt="Google Logo" boxSize="40px" />
                            </Button>
                            <Button onClick={() => loginWithRedirect()} p={0} border="none">
                                <Image src={XLogo} alt="X Logo" boxSize="40px" />
                            </Button>
                        </HStack>

                        <VStack gap={4} mt={6}>
                            <Button bg="black" color="white" _hover={{ bg: "gray.800" }} onClick={() => navigate("/signup")}>
                                Sign up
                            </Button>
                            <Button as="a" bg="white" onClick={() => navigate("/forgotpassword")}>
                                Forgot Password?
                            </Button>
                        </VStack>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SignInForm;
        


