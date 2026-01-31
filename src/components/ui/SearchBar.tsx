"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Box } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const searchTerms = [
    "jobs",
    "admit cards",
    "result",
    "answer key",
    "career blogs",
  ];
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const iterationCount = useRef(0);
  const maxIterations = 3;

  useEffect(() => {
    if (hasCompleted) return;

    const currentTerm = searchTerms[currentTermIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTerm.length) {
          setDisplayText(currentTerm.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          const nextIndex = (currentTermIndex + 1) % searchTerms.length;

          if (nextIndex === 0) {
            iterationCount.current += 1;
            if (iterationCount.current >= maxIterations) {
              setHasCompleted(true);
              setDisplayText(searchTerms[0]);
              return;
            }
          }

          setCurrentTermIndex(nextIndex);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTermIndex, hasCompleted]);

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
        placeholder={`Search for ${displayText}`}
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
