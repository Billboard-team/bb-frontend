import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import BillboardLogo from "@/assets/icons/Billboard-Logo.png";

const SignInForm = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      p={10}
      bg="white"
    >
      <img
        src={BillboardLogo}
        alt="Billboard Logo"
        style={{ width: "200px", marginBottom: "2rem" }}
      />
      <Spinner size="xl" color="black" mb={4} />
      <Text fontSize="lg" color="gray.600">
        Redirecting to login...
      </Text>
    </Box>
  );
};

export default SignInForm;
