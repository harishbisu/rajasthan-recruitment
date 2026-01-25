import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Text, Avatar } from '@chakra-ui/react'
import { Calendar, Clock, Tag } from 'lucide-react'
import { BlogPost } from '@/lib/api/types'
import { formatDate } from '@/lib/utils/date'

interface ArticleHeaderProps {
    post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
    const borderColor = '#5d93fe'
    const bgCard = 'white'
    const textMain = 'gray.900'
    const textSecondary = 'gray.600'

    return (
        <Box borderRadius="lg" p={{ sm: 2, md: 0 }}>
            <Flex align="center" gap={2} mb={4}>
                <Link
                    as={NextLink}
                    href={`/category/${post.category.slug}`}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    bg="blue.100"
                    color="blue.800"
                    _hover={{ bg: 'blue.200' }}
                    display="inline-flex"
                    alignItems="center"
                >
                    <Tag size={14} style={{ marginRight: 4 }} />
                    {post.category.name}
                </Link>
            </Flex>

            <Heading
                as="h1"
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                fontWeight="bold"
                color={textMain}
                mb={4}
                lineHeight="tight"
            >
                {post.title}
            </Heading>

            <Text
                as="p"
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                color={textSecondary}
                mb={6}
                lineHeight="relaxed"
            >
                {post.excerpt}
            </Text>
            <figure>
                <Box bg={bgCard} borderRadius="lg" boxShadow="sm" overflow="hidden">
                    <NextImage
                        src={post.featuredImage}
                        alt={post.title}
                        width={400}
                        height={200}
                        style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover'
                        }}
                        priority
                    />
                </Box>
                <figcaption style={{ userSelect:'none', fontSize: '0.75rem', color: '#4A5568', paddingTop: '0px' }}>
                    <span style={{color: 'blue'}}>⌞</span>
                    {post.title}
                </figcaption>
            </figure>
            <Flex
                flexWrap="wrap"
                align="center"
                gap={6}
                pb={2}
                mb={6}
                fontSize="sm"
                color={textSecondary}
                borderBottomWidth={2}
                borderColor={borderColor}
                pt={4}
            >
                <Flex align="center" gap={2}>
                    <Avatar.Root size="sm">
                        <Avatar.Fallback name={post.author.name} />
                        <Avatar.Image src={post.author.avatar} />
                    </Avatar.Root>
                    <Text fontWeight="medium" color={textMain}>
                        {post.author.name}
                    </Text>
                </Flex>

                <Flex align="center" gap={1}>
                    <Calendar size={16} />
                    <Text as="time">
                        {formatDate(post.publishedAt)}
                    </Text>
                </Flex>

                <Flex align="center" gap={1}>
                    <Clock size={16} />
                    <Text>{post.readTime} min read</Text>
                </Flex>
            </Flex>
            <Text
                as="p"
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                color={textSecondary}
                mb={6}
                lineHeight="relaxed"
            >
                {post.description}
            </Text>
        </Box >
    )
}