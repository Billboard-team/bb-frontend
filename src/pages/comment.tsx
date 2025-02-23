import React, { useState } from "react";
import { VStack, Box, Text, Input, Button } from "@chakra-ui/react";

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

    const handleAddComment = () => {
        if (newComment.trim() === "") return;
        const newEntry = {
            id: comments.length + 1,
            text: newComment,
            user: "Guest",
        };
        setComments([...comments, newEntry]);
        setNewComment("");
    };

    return (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Comments</Text>
            <VStack align="start" gap={3} mt={2}>
                {comments.map((comment) => (
                    <Box key={comment.id} p={2} bg="gray.100" borderRadius="md" w="100%">
                        <Text fontWeight="bold">{comment.user}:</Text>
                        <Text>{comment.text}</Text>
                    </Box>
                ))}
            </VStack>
            <Input
                mt={3}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <Button mt={2} onClick={handleAddComment} colorScheme="teal">
                Add Comment
            </Button>
        </Box>
    );
};

export default CommentSection;
