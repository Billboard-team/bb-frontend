import React, { useState, useEffect } from "react";
import {
    VStack,
    Box,
    Text,
    Input,
    Button,
    HStack,
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
    IconButton,
    Dialog
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode"
import { useColorModeValue } from "@/components/ui/color-mode"
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { FaChevronUp, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa"
import { toaster } from "@/components/ui/toaster"
import { useAuth0 } from "@auth0/auth0-react";

interface OpenChangeDetails {
    open: boolean;
}

interface Comment {
    id: number;
    bill: number;
    text: string;
    user_name: string;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string;
}

interface CommentSectionProps {
    billId: number;
}

type SortType = 'most-liked' | 'most-controversial' | 'newest';

const CommentSection: React.FC<CommentSectionProps> = ({ billId }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
        console.log('Auth state:', { isAuthenticated, user });
        if (isAuthenticated && user) {
            console.log('User info:', {
                sub: user.sub,  // This is the Auth0 ID
                email: user.email,
                name: user.name,
                picture: user.picture
            });
        }
    }, [isAuthenticated, user]);

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [newCommentPassword, setNewCommentPassword] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [sortType, setSortType] = useState<SortType>('newest');
    const [editingText, setEditingText] = useState("");
    const [editingPassword, setEditingPassword] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
    const [deletePassword, setDeletePassword] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const buttonBgColor = useColorModeValue("black", "gray.200");
    const buttonTextColor = useColorModeValue("white", "gray.800");
    const iconColor = useColorModeValue("gray.600", "gray.400");
    const commentBgColor = useColorModeValue("gray.50", "gray.700");

    const commentsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    useEffect(() => {
        fetchComments();
    }, [billId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/bills/${billId}/comments/`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data = await response.json();
            setComments(data);
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    const handleLike = async (commentId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/bills/${billId}/comments/${commentId}/like/`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to like comment');
            setComments(comments.map(comment => 
                comment.id === commentId 
                    ? { ...comment, likes: comment.likes + 1 }
                    : comment
            ));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to like comment');
        }
    };

    const handleDislike = async (commentId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/bills/${billId}/comments/${commentId}/dislike/`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to dislike comment');
            setComments(comments.map(comment => 
                comment.id === commentId 
                    ? { ...comment, dislikes: comment.dislikes + 1 }
                    : comment
            ));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to dislike comment');
        }
    };

    const handleEditClick = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
        setEditingPassword('');
        setShowEditDialog(true);
    };

    const handleDeleteClick = (comment: Comment) => {
        setDeleteCommentId(comment.id);
        setDeletePassword('');
        setShowDeleteDialog(true);
    };

    const handleEditSubmit = async () => {
        if (!editingCommentId) return;

        try {
            const response = await fetch(`http://localhost:8000/api/bills/${billId}/comments/${editingCommentId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: editingText,
                    password: editingPassword,
                }),
            });

            const responseText = await response.text();

            if (!response.ok) {
                const errorMessage = responseText ? JSON.parse(responseText).detail : 'Failed to edit comment';
                toaster.create({
                    title: 'Error',
                    description: errorMessage,
                    type: 'error',
                    duration: 3000,
                    meta: { closable: true },
                });
                return;
            }

            // Update the comment in the local state
            setComments(comments.map(comment => 
                comment.id === editingCommentId 
                    ? { ...comment, text: editingText }
                    : comment
            ));

            setShowEditDialog(false);
            setEditingText('');
            setEditingPassword('');
            setEditingCommentId(null);

            toaster.create({
                title: 'Success',
                description: 'Comment updated successfully',
                type: 'success',
                duration: 3000,
                meta: { closable: true },
            });
        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to edit comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleDeleteSubmit = async () => {
        if (!deleteCommentId) return;

        try {
            const response = await fetch(`http://localhost:8000/api/bills/${billId}/comments/${deleteCommentId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: deletePassword,
                }),
            });

            const responseText = await response.text();

            if (!response.ok) {
                const errorMessage = responseText ? JSON.parse(responseText).detail : 'Failed to delete comment';
                toaster.create({
                    title: 'Error',
                    description: errorMessage,
                    type: 'error',
                    duration: 3000,
                    meta: { closable: true },
                });
                return;
            }

            // Remove the comment from the local state
            setComments(comments.filter(comment => comment.id !== deleteCommentId));

            setShowDeleteDialog(false);
            setDeletePassword('');
            setDeleteCommentId(null);

            toaster.create({
                title: 'Success',
                description: 'Comment deleted successfully',
                type: 'success',
                duration: 3000,
                meta: { closable: true },
            });
        } catch (error) {
            toaster.create({
                title: 'Error',
                description: 'Failed to delete comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() === "" || newCommentPassword.trim() === "") {
            setError("Comment text and password are required");
            return;
        }
        
        console.log('Adding comment with auth state:', { isAuthenticated, user });
        
        const url = `http://localhost:8000/api/bills/${billId}/comments/add/`;
        const requestData = {
            text: newComment,
            user_name: isAuthenticated && user ? user.name || user.email : "Guest",
            password: newCommentPassword,
        };

        console.log('Comment request data:', requestData);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            
            const responseText = await response.text();
            console.log('Add comment response:', responseText);

            if (!response.ok) {
                let errorMessage = 'Failed to add comment';
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = 'Failed to add comment';
                }
                throw new Error(errorMessage);
            }

            const newEntry = JSON.parse(responseText);
            setComments([newEntry, ...comments]);
            setNewComment("");
            setNewCommentPassword("");
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add comment');
        }
    };

    const getSortedComments = () => {
        switch (sortType) {
            case 'most-liked':
                return [...comments].sort((a, b) => b.likes - a.likes);
            case 'most-controversial':
                return [...comments].sort((a, b) => {
                    const aTotal = a.likes + a.dislikes;
                    const bTotal = b.likes + b.dislikes;
                    const aRatio = a.likes / (aTotal || 1);
                    const bRatio = b.likes / (bTotal || 1);
                    const aDist = Math.abs(0.5 - aRatio);
                    const bDist = Math.abs(0.5 - bRatio);
                    
                    // If controversy levels are equal (within a small margin)
                    if (Math.abs(aDist - bDist) < 0.01) {
                        // Sort by total interactions (more interactions first)
                        return bTotal - aTotal;
                    }
                    
                    // Otherwise sort by controversy
                    return aDist - bDist;
                });
            case 'newest':
            default:
                return [...comments].sort((a, b) => 
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
        }
    };

    const sortedComments = getSortedComments();
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const displayedComments = sortedComments.slice(startIndex, endIndex);

    return (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} bg={bgColor}>
            <Box fontSize="lg" fontWeight="bold" color={textColor}>
                Comments
                <select
                    style={{
                        marginLeft: '1rem',
                        width: '200px',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        border: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.600'),
                        backgroundColor: useColorModeValue('white', 'gray.700'),
                        color: 'black'
                    }}
                    value={sortType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortType(e.target.value as SortType)}
                >
                    <option value="newest">Newest</option>
                    <option value="most-liked">Most Liked</option>
                    <option value="most-controversial">Most Controversial</option>
                </select>
                <IconButton
                    aria-label="Toggle comments"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    transition="transform 0.3s ease-in-out"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    ml={2}
                    color={iconColor}
                >
                    <FaChevronUp />
                </IconButton>
            </Box>
            
            <Box mt={4}>
                {isOpen && (
                    <VStack align="start" gap={3} mt={2} w="100%">
                        {displayedComments.map((comment) => (
                            <Box 
                                key={comment.id} 
                                p={4} 
                                borderRadius="md" 
                                w="100%" 
                                borderWidth="1px"
                                borderColor={borderColor}
                                bg={commentBgColor}
                            >
                                <HStack justify="space-between">
                                    <Text fontWeight="bold" color={textColor}>{comment.user_name}:</Text>
                                    <HStack>
                                        <IconButton
                                            aria-label="Like"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleLike(comment.id)}
                                            color={iconColor}
                                        >
                                            <FaThumbsUp />
                                        </IconButton>
                                        <Text color={textColor}>{comment.likes}</Text>
                                        <IconButton
                                            aria-label="Dislike"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDislike(comment.id)}
                                            color={iconColor}
                                        >
                                            <FaThumbsDown />
                                        </IconButton>
                                        <Text color={textColor}>{comment.dislikes}</Text>
                                        <IconButton
                                            aria-label="Edit"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditClick(comment)}
                                            color={iconColor}
                                        >
                                            <FaEdit />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteClick(comment)}
                                            color={iconColor}
                                        >
                                            <FaTrash />
                                        </IconButton>
                                    </HStack>
                                </HStack>
                                <Text color={textColor} mt={2}>{comment.text}</Text>
                            </Box>
                        ))}
                    </VStack>
                )}

                {/* Pagination Controls */}
                {comments.length > commentsPerPage && (
                    <HStack mt={3} justify="space-between" w="100%">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            size="sm"
                            bg={buttonBgColor}
                            color={buttonTextColor}
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
                            bg={buttonBgColor}
                            color={buttonTextColor}
                        >
                            Next
                        </Button>
                    </HStack>
                )}

                {/* Comment Input */}
                <VStack gap={2} mt={4} w="100%">
                    <Input
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        bg={bgColor}
                        color={textColor}
                        borderColor={borderColor}
                    />
                    <Input
                        placeholder="Set a password for editing/deleting..."
                        value={newCommentPassword}
                        onChange={(e) => setNewCommentPassword(e.target.value)}
                        type="password"
                        bg={bgColor}
                        color={textColor}
                        borderColor={borderColor}
                    />
                    <Button 
                        w="100%" 
                        bg={buttonBgColor} 
                        color={buttonTextColor}
                        onClick={handleAddComment}
                        _hover={{
                            bg: useColorModeValue("gray.800", "gray.300"),
                        }}
                    >
                        Add Comment
                    </Button>
                </VStack>
            </Box>

            {/* Edit Dialog */}
            <DialogRoot 
                open={showEditDialog} 
                onOpenChange={(details: OpenChangeDetails) => setShowEditDialog(details.open)}
            >
                <DialogContent backdrop>
                    <DialogHeader>
                        <DialogTitle>Edit Comment</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <VStack gap={3}>
                            <Input
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                placeholder="Edit your comment..."
                                bg={bgColor}
                                color={textColor}
                                borderColor={borderColor}
                            />
                            <Input
                                type="password"
                                value={editingPassword}
                                onChange={(e) => setEditingPassword(e.target.value)}
                                placeholder="Enter your password..."
                                bg={bgColor}
                                color={textColor}
                                borderColor={borderColor}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button 
                            bg={buttonBgColor} 
                            color={buttonTextColor} 
                            onClick={() => setShowEditDialog(false)}
                            _hover={{
                                bg: useColorModeValue("gray.800", "gray.300"),
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            bg={buttonBgColor} 
                            color={buttonTextColor} 
                            onClick={handleEditSubmit}
                            _hover={{
                                bg: useColorModeValue("gray.800", "gray.300"),
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>

            {/* Delete Dialog */}
            <DialogRoot 
                open={showDeleteDialog} 
                onOpenChange={(details: OpenChangeDetails) => setShowDeleteDialog(details.open)}
            >
                <DialogContent backdrop>
                    <DialogHeader>
                        <DialogTitle>Delete Comment</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <VStack gap={3}>
                            <Text color={textColor}>Are you sure you want to delete this comment?</Text>
                            <Input
                                type="password"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                placeholder="Enter your password to confirm..."
                                bg={bgColor}
                                color={textColor}
                                borderColor={borderColor}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button 
                            bg={buttonBgColor} 
                            color={buttonTextColor} 
                            onClick={() => setShowDeleteDialog(false)}
                            _hover={{
                                bg: useColorModeValue("gray.800", "gray.300"),
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            bg={buttonBgColor} 
                            color={buttonTextColor} 
                            onClick={handleDeleteSubmit}
                            _hover={{
                                bg: useColorModeValue("gray.800", "gray.300"),
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};

export default CommentSection;
