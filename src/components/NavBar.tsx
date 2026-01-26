"use client";
import { SearchBar } from "./ui/SearchBar";
import { Box, Button, Icon, Image, Text } from "@chakra-ui/react";
import { UserPlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
export const Navbar = () => {
  const route = useRouter();
  return (
    <Box
      bg={"white"}
      position={"sticky"}
      w={"full"}
      top={0}
      zIndex={99}
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      p={4}
      borderBottom={"1px solid #e0e0e0"}
      gap={4}
    >
      <Box
        display={"flex"}
        alignItems="center"
        onClick={() => route.push("/")}
        cursor={"pointer"}
        flexShrink={0}
      >
        <Box minW={"40px"}>
          <Image
            src="/rr.png"
            alt="Rajasthan Recruitment"
            boxSize="40px"
            mr={{ base: 0, md: 2 }}
            // filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          />
        </Box>
        <Text
          color="#5d93fe"
          fontSize={{ base: "md", md: "18px" }}
          lineHeight="1"
          fontWeight="medium"
          userSelect="none"
          display={{ base: "none", sm: "block" }}
          letterSpacing="-0.2px"
          // textTransform="uppercase"
        >
          Rajasthan
          <br />
          Recruitment
        </Text>
      </Box>

      <Box flex="1" display="flex" justifyContent="center">
        <Suspense fallback={<Box h="44px" />}>
          <SearchBar />
        </Suspense>
      </Box>

      <Button
        variant="solid"
        bg="#5d93fe"
        color="white"
        pr={{ base: 2, md: 4 }}
        pl={{ base: 2, md: 4 }}
        border={"4px solid #DEE9FF"}
        borderRadius="20px"
        _hover={{ bg: "#5d93fe", boxShadow: "0 1px 3px #DEE9FF" }}
        // px={6}
        h="40px"
        onClick={() =>
          window.open("https://t.me/rajasthanrecruitment", "_blank")
        }
        flexShrink={0}
        size={{ base: "sm", md: "md" }}
        fontWeight="600"
      >
        <Icon as={UserPlus2} strokeWidth={"3px"} boxSize={4} mr={0} />
        <Text display={{ base: "none", md: "block" }}>Join</Text>
      </Button>
    </Box>
  );
};
