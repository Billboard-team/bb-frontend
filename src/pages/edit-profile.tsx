import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Input, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: { audience: "https://billboard.local" },
                });

                const res = await fetch("http://localhost:8000/api/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                setName(data.name || "");
                setEmail(data.email || "");
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [getAccessTokenSilently]);

    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            setError(null);
            const token = await getAccessTokenSilently({
                authorizationParams: { audience: "https://billboard.local" },
            });

            const res = await fetch("http://localhost:8000/api/me/update/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            if (res.status === 409) {
                setError("That username is already taken. Try another one.");
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to update profile");
            }

            alert("Profile updated!");
            navigate("/profile");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <Heading mb={4}>Edit Profile</Heading>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text mb={1}>Name</Text>
                    <Input mb={4} value={name} onChange={(e) => setName(e.target.value)} />

                    <Text mb={1}>Email</Text>
                    <Input mb={4} value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Button colorScheme="teal" onClick={handleSave}>
                        Save Changes
                        </Button>
                        {error && <Text color="red.500" mt={2}>{error}</Text>}
                </>
            )}
        </Box>
    );
};

export default EditProfile;
