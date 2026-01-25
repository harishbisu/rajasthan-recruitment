"use client";
import {
  Button,
  IconButton,
  ButtonProps,
  IconButtonProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ShareButtonClientProps {
  title: string;
  url: string;
  description?: string;
  variant: "desktop" | "mobile" | "native";
  platform?: string;
  shareUrl?: string;
  color?: string;
  textColor?: string;
  children: ReactNode;
  "aria-label"?: string;
}

const ShareButtonClient: React.FC<ShareButtonClientProps> = ({
  title,
  url,
  description = "",
  variant,
  platform,
  shareUrl,
  color,
  textColor,
  children,
  "aria-label": ariaLabel,
  ...props
}) => {
  const handleShare = (): void => {
    if (variant === "native" && navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
          text: description,
        })
        .catch(console.error);
      return;
    }

    if (shareUrl) {
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
    }
  };

  if (variant === "mobile" || variant === "native") {
    return (
      <IconButton
        aria-label={ariaLabel || `Share on ${platform}`}
        size="md"
        variant="ghost"
        onClick={handleShare}
        borderRadius="full"
        w="24px"
        h="24px"
        // minW="24px"
        flexShrink={0}
        _hover={{
          bg: color ? `${color}15` : "gray.100",
          color: color || "gray.600",
          // transform: 'scale(1.1)'
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        // transition="all 0.2s"
        color="gray.600"
        {...(props as IconButtonProps)}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <Button
      gap={2}
      onClick={handleShare}
      variant="ghost"
      size="sm"
      w="full"
      justifyContent="flex-start"
      _hover={{
        bg: color ? `${color}15` : "gray.100",
        color: color || "gray.600",
        transform: "translateX(4px)",
      }}
      _active={{
        transform: "translateX(2px)",
      }}
      transition="all 0.2s"
      color={textColor || "gray.600"}
      {...(props as ButtonProps)}
    >
      {children}
    </Button>
  );
};

export default ShareButtonClient;
