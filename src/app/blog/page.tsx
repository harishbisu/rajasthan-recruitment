import BlogList from "@/components/blog/blog-list";
import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import { generateDynamicDescription, generateDynamicKeywords } from "@/lib/seo-utils";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

const blogPostsArray = Object.values(BLOG_POSTS).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const metadata: Metadata = {
    title: "Latest Government Job Updates & Career Guidance | Blog",
    description: generateDynamicDescription(blogPostsArray, "Articles"),
    keywords: generateDynamicKeywords(blogPostsArray, ["Government Jobs Blog", "Career Guidance", "Exam Tips"]),
    alternates: {
        canonical: "https://rajasthanrecruitment.in/blog",
    },
    openGraph: {
        title: "Latest Government Job Updates & Career Guidance | Blog",
        description: generateDynamicDescription(blogPostsArray, "Articles"),
        url: "https://rajasthanrecruitment.in/blog",
        siteName: "Rajasthan Recruitment",
        type: "website",
        images: [
            {
                url: "https://rajasthanrecruitment.in/rr-home.jpg",
                width: 1200,
                height: 630,
                alt: "Rajasthan Recruitment Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Latest Government Job Updates & Career Guidance | Blog",
        description: generateDynamicDescription(blogPostsArray, "Articles"),
        images: ["https://rajasthanrecruitment.in/rr-home.jpg"],
    },
};

export default function Blogs() {
    return (
        <Box p={{ sm: 2, md: 4 }}>
            <BlogList />
        </Box>
    );
}