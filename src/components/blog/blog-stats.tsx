"use client";

import { useState } from "react";
import {
  HStack,
  Text,
  Icon,
  Button,
  VStack,
  Input,
  Textarea,
  IconButton,
  Box,
  Flex,
  Portal,
  Drawer,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiCopy,
  FiCheck,
  FiX,
  FiMoreHorizontal,
} from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import Image from "next/image";

export default function BlogStats({
  likes: initialLikes,
  comments: initialComments,
  shares: initialShares,
  slug,
}: {
  likes: number;
  comments: number;
  shares: number;
  slug: string;
}) {
  const placementOfDrawer = useBreakpointValue<"bottom" | "end">({
    base: "bottom",
    lg: "end",
  });
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [shares, setShares] = useState(initialShares);

  const [isCommentOpen, setCommentOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);

  const blogUrl = `https://rajasthanrecruitment.in/blog/${slug}`;

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const handleCommentSubmit = () => {
    if (commentName.trim() && commentText.trim()) {
      setComments(comments + 1);
      setCommentName("");
      setCommentText("");
      setCommentOpen(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this blog on Rajasthan Recruitment",
          text: "I found this blog interesting, have a look:",
          url: blogUrl,
        });
        setShares(shares + 1);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // alert("Sharing not supported on this device/browser.");
    }
  };

  const handleShare = (platform: string) => {
    setShares(shares + 1);
    const encodedUrl = encodeURIComponent(blogUrl);
    const text = encodeURIComponent("Check out this blog post!");

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${text}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <Box>
      <HStack pt={2} w="full" zIndex={3}>
        <Button
          onClick={handleLike}
          size="sm"
          variant="plain"
          m={0}
          h="auto"
          p={1}
          color={isLiked ? "#5d93fe" : "gray.500"}
          _hover={{ color: "#5d93fe" }}
        >
          <Icon
            as={FiThumbsUp}
            boxSize={4}
            fill={isLiked ? "#5d93fe" : "none"}
          />
          <Text fontSize="sm">{likes}</Text>
        </Button>

        <Button
          onClick={() => {
            setCommentOpen(true);
          }}
          size="sm"
          variant="plain"
          m={0}
          h="auto"
          p={1}
          color="gray.500"
          _hover={{ color: "#5d93fe" }}
        >
          <Icon as={FiMessageCircle} boxSize={4} />
          <Text fontSize="sm">{comments}</Text>
        </Button>

        <Button
          onClick={() => setShareOpen(true)}
          size="sm"
          variant="plain"
          m={0}
          h="auto"
          p={1}
          color="gray.500"
          _hover={{ color: "#5d93fe" }}
        >
          <Icon as={FiShare2} boxSize={4} />
          <Text fontSize="sm">{shares}</Text>
        </Button>
      </HStack>

      <Drawer.Root
        open={isCommentOpen}
        onOpenChange={(details) => setCommentOpen(details.open)}
        placement={placementOfDrawer}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              borderTopRadius="xl"
              // maxH={"90vh"}
              onClick={(e) => e.stopPropagation()}
            >
              <Drawer.Header
                borderBottom={"2px solid"}
                borderBottomColor={"#5d93fe"}
                mt={{ base: 0, lg: 1 }}
              >
                <Drawer.Title>Add Comment</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    size="md"
                    mt={{ base: 0, lg: 2 }}
                  >
                    <FiX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body py={6}>
                <VStack gap={4} align={{ base: "stretch", md: "auto" }}>
                  <Box
                    display={{ base: "none", lg: "block" }}
                    mb={4}
                    position="relative"
                    w="full"
                    h="200px"
                  >
                    <Image
                      src="/images/comment/comment-blog.png"
                      alt="Comment on blog"
                      fill
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Name
                    </Text>
                    <Input
                      placeholder="Your name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      focusRingColor="#5d93fe"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Comment
                    </Text>
                    <Textarea
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      focusRingColor="#5d93fe"
                      rows={4}
                      resize="vertical"
                    />
                  </Box>

                  <Button
                    colorScheme="blue"
                    bg="#5d93fe"
                    _hover={{ bg: "#4a7fe0" }}
                    onClick={handleCommentSubmit}
                    disabled={!commentName.trim() || !commentText.trim()}
                    w="full"
                    mt={2}
                  >
                    Post Comment
                  </Button>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <Drawer.Root
        open={isShareOpen}
        onOpenChange={(details) => setShareOpen(details.open)}
        placement={placementOfDrawer}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              borderTopRadius="xl"
              // maxH={"90vh"}
              onClick={(e) => e.stopPropagation()}
            >
              <Drawer.Header
                borderBottom={"2px solid"}
                borderBottomColor={"#5d93fe"}
                mt={{ base: 0, lg: 1 }}
              >
                <Drawer.Title>Share Blog</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    size="md"
                    mt={{ base: 0, lg: 2 }}
                  >
                    <FiX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body py={6}>
                <VStack gap={6} align="stretch">
                  <Box
                    display={{ base: "none", lg: "block" }}
                    mb={4}
                    position="relative"
                    w="full"
                    h="200px"
                  >
                    <Image
                      src="/images/share/share-blog.png"
                      alt="Share this blog"
                      fill
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={3}>
                      Copy Link
                    </Text>
                    <Flex gap={2}>
                      <Input
                        value={blogUrl}
                        readOnly
                        fontSize="sm"
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                      />
                      <IconButton
                        aria-label="Copy link"
                        onClick={handleCopyLink}
                        colorScheme={copied ? "green" : "gray"}
                        flexShrink={0}
                      >
                        {copied ? <FiCheck /> : <FiCopy />}
                      </IconButton>
                    </Flex>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={3}>
                      Share on Social Media
                    </Text>
                    <Flex
                      gap={3}
                      flexWrap="wrap"
                      justify={{ base: "space-between", md: "flex-start" }}
                    >
                      <IconButton
                        aria-label="Share on Facebook"
                        onClick={() => handleShare("facebook")}
                        colorScheme="facebook"
                        size="lg"
                        rounded="full"
                      >
                        <FaFacebook size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="Share on Twitter"
                        onClick={() => handleShare("twitter")}
                        colorScheme="twitter"
                        size="lg"
                        rounded="full"
                      >
                        <FaTwitter size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="Share on LinkedIn"
                        onClick={() => handleShare("linkedin")}
                        colorScheme="linkedin"
                        size="lg"
                        rounded="full"
                      >
                        <FaLinkedin size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="Share on WhatsApp"
                        onClick={() => handleShare("whatsapp")}
                        colorScheme="whatsapp"
                        size="lg"
                        rounded="full"
                      >
                        <FaWhatsapp size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="Share on Telegram"
                        onClick={() => handleShare("telegram")}
                        colorScheme="telegram"
                        size="lg"
                        rounded="full"
                      >
                        <FaTelegram size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="More share options"
                        onClick={handleNativeShare}
                        size="lg"
                        rounded="full"
                      >
                        <FiMoreHorizontal size={20} />
                      </IconButton>
                    </Flex>
                  </Box>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}
