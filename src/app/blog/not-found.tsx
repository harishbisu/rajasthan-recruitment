"use client";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!loading) {
      setLoading(true);
      router.push("/");
    }
  };

  return (
    <Suspense fallback={null}>
      <Box textAlign="center" py={20}>
        <Heading size="2xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text
          fontSize="lg"
          mb={6}
        >{`Sorry, the page you're looking for no longer exists.`}</Text>
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleClick}
          cursor="pointer"
          _hover={{ bg: "#DEE9FF", border: "1px solid #DEE9FF" }}
          border="1px solid #5d93fe"
          p={2}
          color="#5d93fe"
          bg="white"
        >
          <Undo2Icon />
          Go Back to Home
        </Button>
      </Box>
    </Suspense>
  );
}
