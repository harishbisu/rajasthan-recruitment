"use client";

import React, { useState } from "react";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  path: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  path = "/",
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setIsLoading(true);
    router.push(`${path}?page=${page}`);
  };

  return (
    <Flex justify="center" align="center" gap={4} mt={8} mb={4}>
      <IconButton
        aria-label="Previous Page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        loading={isLoading}
        variant="outline"
        colorScheme="blue"
      >
        <ChevronLeft size={20} />
      </IconButton>

      <Text fontSize="sm" fontWeight="medium">
        Page {currentPage} of {totalPages}
      </Text>

      <IconButton
        aria-label="Next Page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        loading={isLoading}
        variant="outline"
        colorScheme="blue"
      >
        <ChevronRight size={20} />
      </IconButton>
    </Flex>
  );
};
