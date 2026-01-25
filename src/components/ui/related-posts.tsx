import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  featuredImage: string
  publishedAt: string
  readTime: number
  category: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null

  return (
    // <Box bg="white" borderRadius="lg" boxShadow="sm" p={6}>
    <Box bg="white" borderRadius="lg" p={{sm: 2, md: 0}}>
      <Heading as="h3" size="md" color="gray.600" mb={4}>
        Related Articles
      </Heading>
      <Stack>
        {posts.map((post) => (
          <Link 
            as={NextLink} 
            key={post.slug} 
            href={`/blog/${post.slug}`} 
            _hover={{ textDecoration: 'none' }}
          >
            <Flex gap={3} _hover={{ bg: 'gray.50' }} p={2} borderRadius="md" transition="background 0.2s">
              <NextImage 
                src={post.featuredImage} 
                alt={post.title} 
                width={80} 
                height={60} 
                style={{ 
                  borderRadius: 8, 
                  objectFit: 'cover', 
                  flexShrink: 0 
                }} 
              />
              <Box flex={1} minW={0}>
                <Text 
                  fontWeight="medium" 
                  fontSize="sm" 
                  color="gray.900" 
                  lineClamp="2" 
                  lineHeight="tight" 
                  mb={1} 
                  _groupHover={{ color: 'blue.600' }}
                >
                  {post.title}
                </Text>
                <Flex align="center" gap={2} fontSize="xs" color="gray.600">
                  <Text>{post.category}</Text>
                  <Text>•</Text>
                  <Text>{post.readTime} min</Text>
                </Flex>
              </Box>
            </Flex>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}