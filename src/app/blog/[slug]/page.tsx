import { notFound } from "next/navigation";
import { Box, Grid } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/api/blog";
import {
  generateBlogPostJsonLd,
  generateBlogPostMetadata,
} from "@/lib/utils/seo";
import { TagsSection } from "@/components/blog/tags-section";
import { AuthorBio } from "@/components/blog/author-bio";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RelatedPosts } from "@/components/ui/related-posts";
import ShareButtons from "@/components/ui/share-buttons";
import { ArticleHeader } from "@/components/blog/article-header";
import ArticleContent from "@/components/blog/article-content";
import TableOfContents from "@/components/blog/table-of-content";
import { GoogleAd } from "@/components/ui/google-ad";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return generateBlogPostMetadata(post);
}

export async function generateStaticParams() {
  try {
    const availableSlugs = [
      "rpsc-assistant-agriculture-engineer-recruitment-2025",
      "ssc-cgl-2024-complete-guide",
      "ssc-chsl-2024-notification",
      "railway-recruitment-2024",
      "upsc-civil-services-2024",
      "banking-jobs-2024",
      "curaj-teaching-recruitment-2025",
    ];

    return availableSlugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(post.slug, post.category.slug);
  const jsonLd = generateBlogPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box minH="100vh" position={"relative"}>
        <Box display={"flex"} w={"full"}>
          <Box
            height={"fit-content"}
            position={"sticky"}
            zIndex={2}
            top={"73.5px"}
            display={{ base: "none", xl: "flex" }}
          >
            <GoogleAd type="sidebar" slot="7891680227" />
          </Box>
          <Box maxW="6xl" mx="auto" px={{ base: 2, md: 8 }} py={0} mb={6}>
            <Box bg={"white"} position={"sticky"} zIndex={2} top={"73.5px"}>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  {
                    label: post.category.name,
                    href: `/category/${post.category.slug}`,
                  },
                  { label: post.title },
                ]}
              />
            </Box>
            <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={8}>
              <Box as="article" overflow={"auto"}>
                <ArticleHeader post={post} />
                <ArticleContent sections={post.content.sections} />
                <TagsSection tags={post.tags} />
                <AuthorBio author={post.author} />
              </Box>

              <Box as="aside" position="relative">
                <Box
                  position={{ base: "auto", md: "sticky" }}
                  top={{ base: "auto", md: "103px" }}
                >
                  <Box
                    display={{
                      base: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    }}
                  >
                    <TableOfContents content={post.content} />
                  </Box>
                  <ShareButtons
                    title={post.title}
                    description={post.excerpt}
                    url={`https://rajasthanrecruitment.in/blog/${post.slug}`}
                  />
                  <RelatedPosts posts={relatedPosts} />
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box
            h={"fit-content"}
            position={"sticky"}
            zIndex={2}
            top={"73.5px"}
            display={{ base: "none", xl: "flex" }}
          >
            <GoogleAd type="sidebar" slot="7891680227" />
          </Box>
        </Box>
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          h={"fit-content"}
        >
          <GoogleAd type="multiplex" slot="4568995773" />
        </Box>
      </Box>
    </>
  );
}
