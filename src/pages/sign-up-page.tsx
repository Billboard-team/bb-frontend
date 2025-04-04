import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import BillboardLogo from "@/assets/icons/Billboard-Logo.png";

const SignupForm = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup", // 👈 Tells Auth0 to show the sign-up tab
      },
    });
  }, [loginWithRedirect]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minH="100vh"
      bg="white"
      p={10}
    >
      <img
        src={BillboardLogo}
        alt="Billboard Logo"
        style={{ width: "200px", marginBottom: "2rem" }}
      />
      <Spinner size="xl" color="black" mb={4} />
      <Text fontSize="lg" color="gray.600">
        Redirecting to sign-up...
      </Text>
    </Box>
  );
};

export default SignupForm;
