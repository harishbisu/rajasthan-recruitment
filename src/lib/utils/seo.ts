import { Metadata } from 'next'
import { BlogPost } from '../api/types'

export const SITE_CONFIG = {
  name: 'Rajasthan Recruitment',
  description: 'Latest government job notifications, recruitment updates, and career opportunities in Rajasthan',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rajasthanrecruitment.in',
  ogImage: '/og-image.png',
  logo: '/rr.png',
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`
  
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords?.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: postUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category.name,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateBlogPostJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: { 
      '@type': 'Person', 
      name: post.author.name,
      ...(post.author.social?.email && { email: post.author.social.email })
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: { 
        '@type': 'ImageObject', 
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}` 
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { 
      '@type': 'WebPage', 
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}` 
    },
    keywords: post.tags.join(', '),
    articleSection: post.category.name,
    // wordCount: post.content.replace(/<[^>]*>/g, '').split(' ').length,
    inLanguage: 'en-IN',
  }
}