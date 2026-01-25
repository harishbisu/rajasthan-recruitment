import { Box, Flex, Heading, Text } from '@chakra-ui/react'

interface TagsSectionProps {
  tags: string[]
}

export function TagsSection({ tags }: TagsSectionProps) {
  if (!tags.length) return null

  return (
    <Box bg="white" p={{sm: 2, md: 0}} mb={6}>
      <Heading as="h3" size="md" color="gray.900" mb={3}>
        Tags
      </Heading>
      <Flex flexWrap="wrap" gap={2}>
        {tags.map((tag) => (
          <Text 
            key={tag} 
            px={3} 
            py={1} 
            borderRadius="full" 
            fontSize="sm" 
            bg="gray.100" 
            color="gray.700" 
            _hover={{ bg: 'gray.200' }}
            cursor="pointer"
          >
            #{tag}
          </Text>
        ))}
      </Flex>
    </Box>
  )
}