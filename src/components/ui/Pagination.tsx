"use client";

import { Flex, Text, IconButton, Box } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FullScreenLoader from "../FullScreenLoader";
import { useState, useEffect } from "react";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  if (totalPages <= 1) return null;

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setIsLoading(true);
    router.push(`${path}?page=${page}`);
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <Flex justify="center" align="center" gap={4} mt={8} mb={4}>
        <IconButton
          aria-label="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          bg={"#5d93fe"}
          border={"5px solid #DEE9FF"}
          borderRadius="50%"
        >
          <ChevronLeft strokeWidth={"3px"} color="white" size={18} />
        </IconButton>

        <Box
          px={4}
          py={1}
          bg="#5d93fe"
          borderRadius="25px"
          border="5px solid #DEE9FF"
        >
          <Text fontSize="sm" fontWeight="bold" color="white">
            Page {currentPage} of {totalPages}
          </Text>
        </Box>

        <IconButton
          aria-label="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          bg={"#5d93fe"}
          border={"5px solid #DEE9FF"}
          borderRadius="50%"
        >
          <ChevronRight strokeWidth={"3px"} color="white" size={18} />
        </IconButton>
      </Flex>
    </>
  );
};
