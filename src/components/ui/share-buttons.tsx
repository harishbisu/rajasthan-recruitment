import { Box, VStack, HStack, Text, Grid, Heading } from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
  FaShare,
} from "react-icons/fa";
import { IconType } from "react-icons";
import ShareButtonClient from "./share-button-client";
import CopyLinkButton from "./copy-link-button";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

interface SocialButton {
  name: string;
  icon: IconType;
  color: string;
  platform: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  description = "",
}) => {
  const bgColor = "white";
  const borderColor = "#5d93fe";
  const textColor = "gray.600";

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  // const encodedDescription = encodeURIComponent(description);

  const shareLinks: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const socialButtons: SocialButton[] = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "#1877F2",
      platform: "facebook",
    },
    {
      name: "X (Twitter)",
      icon: FaTwitter,
      color: "#000000",
      platform: "twitter",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "#0A66C2",
      platform: "linkedin",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      platform: "whatsapp",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "#0088CC",
      platform: "telegram",
    },
    {
      name: "Reddit",
      icon: FaReddit,
      color: "#FF4500",
      platform: "reddit",
    },
  ];

  return (
    <Box
      bg={bgColor}
      // border="1px"
      // borderColor={borderColor}
      borderRadius="lg"
      p={{ sm: 2, md: 0 }}
      mb={6}
      // shadow="sm"
      role="region"
      aria-label="Share this content"
    >
      <VStack gap={4} align="stretch">
        <HStack justify="space-between" align="center">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            border="2px"
            borderColor={borderColor}
            display={{ base: "block", md: "block" }}
          >
            <Heading
              as="h3"
              size="md"
              color="gray.600"
              display={{ base: "inline", md: "none" }}
            >
              Share
            </Heading>
            <Heading
              as="h3"
              size="md"
              color="gray.600"
              display={{ base: "none", md: "inline" }}
            >
              Share this post
            </Heading>
          </Text>
          <ShareButtonClient
            title={title}
            url={url}
            description={description}
            variant="native"
          >
            <FaShare color="#52525b" size={16} />
          </ShareButtonClient>
        </HStack>

        <Box display={{ base: "none", md: "block" }}>
          <Grid gap={2} templateColumns="repeat(2, 1fr)">
            {socialButtons.map((social) => (
              <ShareButtonClient
                key={social.platform}
                title={title}
                url={url}
                description={description}
                variant="desktop"
                platform={social.platform}
                shareUrl={shareLinks[social.platform]}
                color={social.color}
                textColor={textColor}
              >
                <social.icon />
                {social.name}
              </ShareButtonClient>
            ))}
          </Grid>
          <Box mt={4}>
            <CopyLinkButton url={url} variant="desktop" />
          </Box>
        </Box>

        <Box overflow={"auto"} display={{ base: "auto", md: "none" }}>
          <Box
            gap={3}
            display={"flex"}
            overflow={"auto"}
            pb={4}
            pt={4}
            w={"full"}
            justifyContent={"space-around"}
            // minW="max-content"
          >
            {socialButtons.map((social) => (
              <ShareButtonClient
                key={social.platform}
                title={title}
                url={url}
                description={description}
                variant="mobile"
                platform={social.platform}
                shareUrl={shareLinks[social.platform]}
                color={social.color}
                aria-label={`Share on ${social.name}`}
              >
                <social.icon size={20} />
              </ShareButtonClient>
            ))}
            <CopyLinkButton url={url} variant="mobile" />
          </Box>
        </Box>
      </VStack>

      <Box position="absolute" left="-9999px" aria-hidden="true">
        <Text>Share this content:</Text>
        {socialButtons.map((social) => (
          <a
            key={social.platform}
            href={shareLinks[social.platform]}
            rel="noopener noreferrer"
          >
            Share on {social.name}
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default ShareButtons;
