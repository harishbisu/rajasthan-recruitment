"use client";

import { useEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdType = "display" | "in-feed" | "multiplex" | "sidebar";

interface GoogleAdProps {
  type: AdType;
  slot: string;
  style?: React.CSSProperties;
  label?: boolean;
}

const formatConfig = {
  display: {
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
    style: { display: "block" },
  },
  "in-feed": {
    "data-ad-format": "fluid",
    "data-ad-layout-key": "-fu-2i-17-2d+rw",
    style: { display: "block" },
  },
  multiplex: {
    "data-ad-format": "autorelaxed",
    style: { display: "block" },
  },
  sidebar: {
    style: { display: "inline-block", width: "100%", height: "600px" },
  },
};

export const GoogleAd: React.FC<GoogleAdProps> = ({
  type,
  slot,
  style,
  label = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const config = formatConfig[type];

  return (
    <Box w="full" my={4} textAlign="center" overflow="hidden">
      {label && (
        <Text
          fontSize="xs"
          color="gray.400"
          mb={1}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Advertisement
        </Text>
      )}
      <Box
        bg="gray.50"
        borderRadius="md"
        minH={type === "sidebar" ? "600px" : "100px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          data-ad-client="ca-pub-3383607348636418"
          data-ad-slot={slot}
          {...config}
          style={{ ...config.style, ...style }}
        />
      </Box>
    </Box>
  );
};
