import React, { useState } from 'react';
import {
    Button,
    Input,
    VStack,
    Text,
    Image,
    Link,
    Box,
    HStack,
} from '@chakra-ui/react';
import GoogleLogo from '../assets/icons/google.png';
import XLogo from '../assets/icons/x.png';
import BillboardLogo from '../assets/icons/Billboard-Logo.png';

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Form submitted:', formData);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="white"
            w="100%"
            h="100%"
            m="0"
            p="0"
            overflow="hidden"
            boxSizing="border-box"
        >
            <Box bg="white" p={8} w={{ base: '90%', md: '500px' }}>
                <Box textAlign="center" mb={10}>
                    <Image src={BillboardLogo} alt="Billboard Logo" mx="auto" maxW="100%" h="auto" />
                </Box>

                <form onSubmit={handleSubmit}>
                    <VStack gap={4}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            w="90%"
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            w="90%"
                            required
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            w="90%"
                            required
                        />
                        <Input
                            type="text"
                            name="nickname"
                            placeholder="Nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            w="90%"
                            required
                        />
                        <Button type="submit" colorScheme="blackAlpha" w="90%" color="white">
                            Sign Up
                        </Button>
                    </VStack>
                </form>

                <Text textAlign="center" color="gray.500" my={4}>
                    or
                </Text>

                {/* Social Media Icons */}
                <HStack justify="center" gap={6} mt={4}>
                    <Button
                        onClick={() => console.log("Google Signup")}
                        p={0}
                        border="none"
                    >
                        <Image src={GoogleLogo} alt="Google Logo" boxSize="40px" />
                    </Button>
                    <Button
                        onClick={() => console.log("Twitter Signup")}
                        p={0}
                        border="none"
                        
                    >
                        <Image src={XLogo} alt="X Logo" boxSize="40px" />
                    </Button>
                </HStack>


                <Box textAlign="center" mt={4}>
                    <Link href="/login" color="blue.500" fontWeight="medium">
                        Already have an account? Log in here
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignupForm;
