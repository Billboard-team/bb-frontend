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
    Dialog,
    DialogDescription,
    Textarea
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
    auth0_id: string;
}

interface CommentSectionProps {
    billId: number;
}

type SortType = 'most-liked' | 'most-controversial' | 'newest';

const CommentSection: React.FC<CommentSectionProps> = ({ billId }) => {
    // Auth0 hooks
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
    
    // Color mode hooks
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const buttonBgColor = useColorModeValue("black", "white");
    const buttonTextColor = useColorModeValue("white", "black");
    const iconColor = useColorModeValue("gray.600", "gray.400");
    const commentBgColor = useColorModeValue("gray.50", "gray.700");

    // State hooks
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [sortType, setSortType] = useState<SortType>('newest');
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [editingText, setEditingText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
    const [dislikedComments, setDislikedComments] = useState<Set<number>>(new Set());

    const commentsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    // Effect hooks
    useEffect(() => {
        if (isAuthenticated) {
            fetchComments();
        }
    }, [billId, isAuthenticated]);

    const fetchComments = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/?bill_id=${billId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/${commentId}/like/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to like comment');
            }
            const updatedComment = await response.json();
            setComments(comments.map(comment => 
                comment.id === commentId ? updatedComment : comment
            ));
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to like comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleDislike = async (commentId: number) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/${commentId}/dislike/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to dislike comment');
            }
            const updatedComment = await response.json();
            setComments(comments.map(comment => 
                comment.id === commentId ? updatedComment : comment
            ));
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to dislike comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleEditClick = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
        setShowEditDialog(true);
    };

    const handleDeleteClick = (comment: Comment) => {
        setDeleteCommentId(comment.id);
        setShowDeleteDialog(true);
    };

    const handleEditSubmit = async () => {
        if (!editingComment || !isAuthenticated) return;

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/${editingComment.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: editingText
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to edit comment');
            }

            const updatedComment = await response.json();
            setComments(comments.map(comment => 
                comment.id === updatedComment.id ? updatedComment : comment
            ));
            setShowEditDialog(false);
            setEditingComment(null);
            setEditingText("");

            toaster.create({
                title: 'Success',
                description: 'Comment updated successfully',
                type: 'success',
                duration: 3000,
                meta: { closable: true },
            });
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to edit comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleDeleteSubmit = async () => {
        if (!editingComment || !isAuthenticated) return;

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/${editingComment.id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete comment');
            }

            setComments(comments.filter(comment => comment.id !== editingComment.id));
            setShowDeleteDialog(false);
            setEditingComment(null);

            toaster.create({
                title: 'Success',
                description: 'Comment deleted successfully',
                type: 'success',
                duration: 3000,
                meta: { closable: true },
            });
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to delete comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
        }
    };

    const handleAddComment = async () => {
        if (!isAuthenticated || !user) {
            toaster.create({
                title: 'Error',
                description: 'Please log in to add comments',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
            return;
        }

        if (newComment.trim() === "") {
            toaster.create({
                title: 'Error',
                description: 'Comment text is required',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
            return;
        }

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8000/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: newComment,
                    bill: Number(billId),
                    user_name: user.name || user.email
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to add comment');
            }

            const newCommentData = await response.json();
            setComments(prevComments => [newCommentData, ...prevComments]);
            setNewComment("");

            toaster.create({
                title: 'Success',
                description: 'Comment added successfully',
                type: 'success',
                duration: 3000,
                meta: { closable: true },
            });
        } catch (err) {
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to add comment',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            });
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
            {!isAuthenticated ? (
                <Box textAlign="center" py={4}>
                    <Text color={textColor}>Please log in to view and add comments</Text>
                    <Button
                        mt={2}
                        bg={buttonBgColor}
                        color={buttonTextColor}
                        onClick={() => loginWithRedirect()}
                        _hover={{
                            bg: useColorModeValue("gray.800", "gray.300"),
                        }}
                    >
                        Log In
                    </Button>
                </Box>
            ) : (
                <>
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
                                            <HStack gap={2}>
                                                <IconButton
                                                    aria-label="Like"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleLike(comment.id)}
                                                    color={likedComments.has(comment.id) ? "green.500" : iconColor}
                                                    disabled={likedComments.has(comment.id) || dislikedComments.has(comment.id)}
                                                >
                                                    <FaThumbsUp />
                                                </IconButton>
                                                <Text color={textColor}>{comment.likes}</Text>
                                                <IconButton
                                                    aria-label="Dislike"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDislike(comment.id)}
                                                    color={dislikedComments.has(comment.id) ? "red.500" : iconColor}
                                                    disabled={likedComments.has(comment.id) || dislikedComments.has(comment.id)}
                                                >
                                                    <FaThumbsDown />
                                                </IconButton>
                                                <Text color={textColor}>{comment.dislikes}</Text>
                                                {user?.sub === comment.auth0_id && (
                                                    <>
                                                        <IconButton
                                                            aria-label="Edit comment"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingComment(comment);
                                                                setEditingText(comment.text);
                                                                setShowEditDialog(true);
                                                            }}
                                                            color={iconColor}
                                                        >
                                                            <FaEdit />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="Delete comment"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingComment(comment);
                                                                setShowDeleteDialog(true);
                                                            }}
                                                            color={iconColor}
                                                        >
                                                            <FaTrash />
                                                        </IconButton>
                                                    </>
                                                )}
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
                    <DialogRoot open={showEditDialog}>
                        <DialogContent>
                            <Box p={4}>
                                <DialogTitle>Edit Comment</DialogTitle>
                                <DialogDescription mt={2}>
                                    Make changes to your comment here.
                                </DialogDescription>
                                <Box mt={4}>
                                    <Textarea
                                        value={editingText}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingText(e.target.value)}
                                        placeholder="Edit your comment..."
                                        size="md"
                                        bg={bgColor}
                                        color={textColor}
                                        borderColor={borderColor}
                                    />
                                </Box>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowEditDialog(false)}
                                        color={textColor}
                                        borderColor={borderColor}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleEditSubmit}
                                        bg={buttonBgColor}
                                        color={buttonTextColor}
                                        ml={3}
                                    >
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </Box>
                        </DialogContent>
                    </DialogRoot>

                    {/* Delete Dialog */}
                    <DialogRoot open={showDeleteDialog}>
                        <DialogContent>
                            <Box p={4}>
                                <DialogTitle>Delete Comment</DialogTitle>
                                <DialogDescription mt={2}>
                                    Are you sure you want to delete this comment? This action cannot be undone.
                                </DialogDescription>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteDialog(false)}
                                        color={textColor}
                                        borderColor={borderColor}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDeleteSubmit}
                                        bg="red.500"
                                        color="white"
                                        ml={3}
                                        _hover={{ bg: "red.600" }}
                                    >
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </Box>
                        </DialogContent>
                    </DialogRoot>
                </>
            )}
        </Box>
    );
};

export default CommentSection;
