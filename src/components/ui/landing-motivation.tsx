"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export const LandingMotivation = () => {
  return (
    <Box position="relative" mb={{ sm: 2, md: 4 }}>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.2"
        zIndex={1}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 50 L 50 50 L 50 0"
                fill="none"
                stroke="#5d93fe"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </Box>

      <Stack
        m={{ base: 2, md: 2, lg: 0 }}
        justifyContent={{ base: "space-between", md: "space-around" }}
        alignItems="center"
        direction={{ base: "row", md: "row" }}
      >
        <Text
          color="#6B7280"
          fontSize={{ base: "20px", md: "36px", lg: "48px" }}
          textAlign="center"
        >
          राह सही हो तो,
          <br />
          कठिनाई भी आसान लगती है।
        </Text>

        <Box
          position="relative"
          w={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
          h={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
          flexShrink={0}
        >
          <Image
            src="/rr-home.jpg"
            alt="Study Motivation"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
