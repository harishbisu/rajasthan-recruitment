"use client";
import React, { useState } from "react";
import { Input, Box } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSearch}
      w="full"
      maxW="600px"
      mx="auto"
      position="relative"
    >
      <Box
        position="absolute"
        left="12px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        display="flex"
        alignItems="center"
        pointerEvents="none"
      >
        <Search size={18} color="#9aa0a6" />
      </Box>
      <Input
        type="text"
        placeholder="Search for jobs, admit cards..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        borderRadius="full"
        bg="white"
        border="1px solid #dfe1e5"
        pl="40px"
        _hover={{
          boxShadow: "0 1px 6px #DEE9FF",
          borderColor: "#5d93fe",
        }}
        _focus={{
          boxShadow: "0 1px 6px #DEE9FF",
          borderColor: "#5d93fe",
          outline: "none",
        }}
        fontSize="16px"
        h="44px"
      />
    </Box>
  );
};
