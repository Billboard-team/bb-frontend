import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CompleteProfile = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: "https://billboard.local",
                },
            });

            const res = await fetch("http://localhost:8000/api/me/update/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: username }),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            // Redirect after success
            window.location.href = "http://localhost:5173/profile";
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={10}>
            <Text fontSize="xl" mb={4}>Complete Your Profile</Text>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
                <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>

                {error && <Text color="red.500">{error}</Text>}
            </div>
        </Box>
    );
};

export default CompleteProfile;
