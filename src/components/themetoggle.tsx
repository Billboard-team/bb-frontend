import { Button } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode"

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // ✅ Get current mode

    return (
        <Button onClick={toggleColorMode} colorScheme="teal">
            {colorMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </Button>
    );
};

export default ThemeToggle;
