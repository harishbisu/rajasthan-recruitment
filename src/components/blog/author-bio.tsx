import { Box, Flex, Heading, Text, Avatar } from "@chakra-ui/react";

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <Box bg="white" mt={{ base: "auto", md: 6 }} p={{ sm: 2, md: 0 }} mb={6}>
      <Heading as="h3" size="md" color="gray.900" mb={4}>
        About the Author
      </Heading>
      <Flex gap={4} align="center">
        <Avatar.Root size="sm">
          <Avatar.Fallback name={author.name} />
          <Avatar.Image src={author.avatar} />
        </Avatar.Root>
        <Box>
          <Text fontWeight="medium" color="gray.900" mb={1}>
            {author.name}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {author.bio}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
