import React, { useState } from 'react';
import GoogleLogo from '@/assets/icons/google.png';
import XLogo from '@/assets/icons/x.png';
import BillboardLogo from '@/assets/icons/Billboard-Logo.png';
import {
    Button,
    Input,
    VStack,
    Text,
    Image,
    Box,
    HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // TODO: Login API call needed for email/password verficiation

        console.log('Form submitted:', formData);
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
        <Box bg="white" p={8} w={{ base: '90%', md: '500px' }}>
            <Box textAlign="center" mb={10}>
                <Image src={BillboardLogo} alt="Billboard Logo" mx="auto" maxW="100%" h="auto" />
            </Box>
  
            <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                    <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email" 
                        type="email" 
                    />
                    <Input 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password" 
                        type="password" 
                    />
                    <Button bg="black" width="full" _dark={{ color: 'white' }} onClick={handleSubmit}>
                        Login
                    </Button>
                </VStack>
            </form>

            <Box textAlign="center" w="100%">
                <Text color="gray.500" my={4}>or</Text>
            </Box>

            {/* TODO: Social Media Icons */}
            <HStack justify="center" gap={6} mt={4}>
                <Button onClick={() => console.log("Google Signup")} p={0} border="none">
                    <Image src={GoogleLogo} alt="Google Logo" boxSize="40px" />
                </Button>
                <Button onClick={() => console.log("X Signup")} p={0} border="none" >
                    <Image src={XLogo} alt="X Logo" boxSize="40px" />
                </Button>
            </HStack>
            <VStack gap={4} mt={6}>
                <Button 
                    bg="black" 
                    color="white" 
                    _hover={{ bg: 'gray.800' }}
                    onClick={() => navigate('/signup')}
                >
                    Sign up
                </Button>
                <Button as="a" bg="white" onClick={() => navigate("/forgotpassword")}>
                    {/* TODO: Display forgot password page and it's functionality */}
                    Forgot Password?
                </Button>
            </VStack>
        </Box>
      </Box>
    );
}

export default SignInForm;
        


