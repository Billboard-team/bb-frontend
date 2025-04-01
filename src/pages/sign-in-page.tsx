// import React, { useState } from "react";
// import GoogleLogo from "@/assets/icons/google.png";
// import XLogo from "@/assets/icons/x.png";
// import ThemeToggle from "@/components/themetoggle";
// import BillboardLogo from "@/assets/icons/Billboard-Logo.png";
// import { useAuth0 } from "@auth0/auth0-react";

// import {
//   Button,
//   Input,
//   VStack,
//   Text,
//   Image,
//   Box,
//   HStack,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// const SignInForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { loginWithRedirect } = useAuth0();

//   const [error, setError] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateEmail = (email: string) => {
//     return email.includes("@");
//   };

//   const validatePassword = (password: string) => {
//     return password.length >= 8;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !validateEmail(formData.email) ||
//       !validatePassword(formData.password)
//     ) {
//       setError("Please enter a valid email and password");
//       return;
//     }

//     const params = new URLSearchParams({
//       client_id: "OeSQoWkWbrSY05ak0yNBJqVtBLbthV2T", // ✅ your actual client ID
//       response_type: "code", // or "token" if you're doing implicit flow
//       redirect_uri: window.location.origin + "/callback", // ✅ must match Auth0 settings
//       scope: "openid profile email",
//       audience: "https://billboard.local", // ✅ your API identifier
//       login_hint: formData.email, // ✅ pre-fills email
//       //prefill_password: formData.password, // ⚠️ used in custom login page script
//     });

//     window.location.href = `https://dev-o057ijjrl6wtbm32.us.auth0.com/authorize?${params.toString()}`;
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       boxSizing="border-box"
//       minH="100vh"
//       bg="white"
//       w="100%"
//       h="100%"
//       m="0"
//       p="0"
//       overflow="hidden"
//     >
//       <Box position="absolute" bottom="20px" left="20px" p={4}>
//         <ThemeToggle />
//       </Box>
//       <Box bg="white" p={8} w={{ base: "90%", md: "500px" }}>
//         <Box textAlign="center" mb={10}>
//           <Image
//             src={BillboardLogo}
//             alt="Billboard Logo"
//             mx="auto"
//             maxW="100%"
//             h="auto"
//           />
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <VStack gap={4}>
//             {error && (
//               <Box
//                 p={3}
//                 bg="red.100"
//                 color="red.500"
//                 borderRadius="md"
//                 width="100%"
//               >
//                 <Text>{error}</Text>
//               </Box>
//             )}
//             <Input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               type="email"
//               border={error ? "2px solid" : "1px solid"}
//               borderColor={error ? "red.500" : "gray.200"}
//             />
//             <Input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               type="password"
//               border={error ? "2px solid" : "1px solid"}
//               borderColor={error ? "red.500" : "gray.200"}
//             />
//             <Button
//               bg="black"
//               width="full"
//               _dark={{ color: "white" }}
//               onClick={handleSubmit}
//             >
//               Login
//             </Button>
//           </VStack>
//         </form>

//         <Box textAlign="center" w="100%">
//           <Text color="gray.500" my={4}>
//             or
//           </Text>
//         </Box>

//         {/* TODO: Social Media Icons */}
//         <HStack justify="center" gap={6} mt={4}>
//           <Button
//             onClick={() =>
//               loginWithRedirect({
//                 authorizationParams: {
//                   connection: "google-oauth2",
//                 },
//               } as any)
//             }
//             p={0}
//             border="none"
//           >
//             <Image src={GoogleLogo} alt="Google Logo" boxSize="40px" />
//           </Button>

//           <Button
//             onClick={() =>
//               loginWithRedirect({
//                 // authorizationParams: {
//                 connection: "twitter",
//                 // }
//               } as any)
//             }
//             p={0}
//             border="none"
//           >
//             <Image src={XLogo} alt="X Logo" boxSize="40px" />
//           </Button>
//         </HStack>

//         <VStack gap={4} mt={6}>
//           <Button
//             bg="black"
//             color="white"
//             _hover={{ bg: "gray.800" }}
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </Button>
//           <Button as="a" bg="white" onClick={() => navigate("/forgotpassword")}>
//             {/* TODO: Display forgot password page and it's functionality */}
//             Forgot Password?
//           </Button>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default SignInForm;
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
