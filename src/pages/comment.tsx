import React, { useState } from "react";
import { VStack, Box, Text, Input, Button, HStack,
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
    IconButton
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode"
import { useColorModeValue } from "@/components/ui/color-mode"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

interface Comment {
    id: number;
    text: string;
    user: string;
}

interface CommentSectionProps {
    billId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ billId }) => {
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, text: "This bill is important!", user: "Alice" },
        { id: 2, text: "I totally agree with this legislation.", user: "Bob" },
    ]);
    const [newComment, setNewComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // const bgColor = useColorModeValue("gray.100", "gray.700");  // Background color
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900"); // Text color
    const inputBgColor = useColorModeValue("white", "gray.800"); // Input field background

    const commentsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    // Calculate the slice of comments to display
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const displayedComments = comments.slice(startIndex, endIndex);
    //TODO: Fetch comments from backend

    /*
       useEffect(() => {
        // Fetch comments from backend
        fetch(`/api/comments/${billId}`) // Replace with actual backend path.
            .then((res) => res.json())
            .then((data) => {
                setComments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
                setLoading(false);
            });
    }, [billId]); // Refetch when `billId` changes  */

    const handleAddComment = () => {
        if (newComment.trim() === "") return;
        const newEntry = {
            id: comments.length + 1,
            text: newComment,
            user: "Guest",
        };
        setComments([...comments, newEntry]);
        setNewComment("");

        //ToDo: Later when set up the back-end, have to send the new comments to the backend
    };

    return (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
        <AccordionRoot>
            <AccordionItem value="comments">
            <Box fontSize="lg" fontWeight="bold" color={textColor}>
                Comments
            </Box>
            <AccordionItemTrigger>
                <IconButton
                    aria-label="Toggle comments"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    transition="transform 0.3s ease-in-out"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                >
                    <FaChevronUp />
                </IconButton>
            </AccordionItemTrigger>
            <AccordionItemContent>
            { isOpen && <VStack align="start" gap={3} mt={2} w="100%">
                {displayedComments.map((comment) => (
                    <Box key={comment.id} p={2} borderRadius="md" w="100%">
                        <Text fontWeight="bold" color={textColor}>{comment.user}:</Text>
                        <Text color={textColor}>{comment.text}</Text>
                    </Box>
                ))}
            
            </VStack>
}
            {/* Pagination Controls */}
            {comments.length > commentsPerPage && (
                <HStack mt={3} justify="space-between" w="100%">
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        size="sm"
                    >
                        Previous
                    </Button>
                    <Text color={textColor}>
                        Page {currentPage} of {totalPages}
                    </Text>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        size="sm"
                    >
                        Next
                    </Button>
                </HStack>
            )}

            {/* Comment Input */}
            <Input
                mt={4}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                bg={inputBgColor}
                color={textColor}
            />
            <Button mt={2} bg="black" color="white" onClick={handleAddComment}>
                Add Comment
            </Button>
            </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
        </Box>
    );
};

export default CommentSection;
