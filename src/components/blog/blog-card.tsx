import { BlogCardProps } from "@/lib/api/types";
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import BlogStats from "./blog-stats";
import PlayOverlay from "../ui/play-overlay";
import { getRelativeTime } from "@/lib/utils/date";

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  image,
  source,
  likes,
  comments,
  shares,
  isSponsored = false,
  isLarge = false,
  hasPlayButton = false,
  sourceLogo,
  slug,
  createdAt,
}) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      border="1px"
      borderColor="gray.100"
      transition="all 0.2s"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
      }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      cursor="pointer"
      h="full"
    >
      <Box>
        <Box position="relative">
          <Image
            src={image}
            alt={title}
            w="full"
            h={{ base: "150px", md: isLarge ? "200px" : "150px" }}
            objectFit="cover"
          />
          {hasPlayButton && <PlayOverlay />}
          {isSponsored && (
            <Badge
              position="absolute"
              top={3}
              right={3}
              bg="rgba(222, 233, 255, 0.95)"
              backdropFilter="blur(8px)"
              // px={2.5}
              // py={1}
              color="#5d93fe"
              border={"2px solid #5d93fe"}
              opacity={0.9}
              fontSize="xs"
              fontWeight="600"
              borderRadius="md"
              textTransform="capitalize"
            >
              Sponsored
            </Badge>
          )}
        </Box>
        <VStack h={"full"} p={4} pb={0} align="start" gap={2}>
          <HStack w="full">
            {sourceLogo && (
              <Avatar.Root size={"sm"} key={sourceLogo}>
                <Avatar.Fallback name={source} />
                <Avatar.Image src={sourceLogo} />
              </Avatar.Root>
            )}
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              {source}
            </Text>
            <Text fontSize="sm" color="gray.400">
              •
            </Text>
            <Text fontSize="sm" color="gray.400">
              {getRelativeTime(createdAt)}
            </Text>
          </HStack>

          <Text
            fontSize={isLarge ? "lg" : "md"}
            fontWeight="semibold"
            color="gray.800"
            lineHeight="1.4"
          >
            {title}
          </Text>
        </VStack>
      </Box>
      <Box p={4} gap={2} pt={0}>
        <BlogStats
          likes={likes}
          comments={comments}
          shares={shares}
          slug={slug}
        />
      </Box>
    </Box>
  );
};
export default BlogCard;
