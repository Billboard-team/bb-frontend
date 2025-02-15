import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from "@/components/dashboard-header";

const FriendListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box w="100%" minH="100vh">
            <Box w="100%" boxShadow="sm" bg="white">
                <DashboardHeader />
            </Box>
            <Box p={4}>
                <Text fontSize="2xl" fontWeight="bold">Friend List</Text>
            </Box>
        </Box>
    )
}

export default FriendListPage;
