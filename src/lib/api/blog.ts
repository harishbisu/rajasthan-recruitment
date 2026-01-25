import { BlogPost, RelatedPost, ApiError } from './types'
import { BLOG_POSTS } from '../data/blog-posts'
import { BLOG_LIST } from '../data/blog-list'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rajasthanrecruitment.in'
const API_TOKEN = process.env.API_TOKEN

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` }),
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.status} ${response.statusText}`,
        statusCode: response.status,
      }

      if (response.status === 404) {
        return null as T
      }

      throw error
    }

    return await response.json()
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return BLOG_POSTS[slug] || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw new Error('Failed to fetch blog post')
  }
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 4
): Promise<RelatedPost[]> {
  try {
    const allRelatedPosts: RelatedPost[] = [
      {
        slug: "rrb-section-controller-recruitment-2025",
        title: "RRB Section Controller Recruitment 2025 – Apply Online for 368 Vacancies",
        excerpt: "The Railway Recruitment Board (RRB) has officially announced the Section Controller Recruitment 2025 under CEN No. 04/2025. With a total of 368 vacancies, this recruitment drive offers an excellent opportunity for graduates who are aiming for a stable career in the Indian Railways.",
        featuredImage: "https://blackbuck.blob.core.windows.net/blackbucks-media/Section-Controller-Recruitment-2025-square-1757916317593.png",
        publishedAt: "2025-09-14T08:00:00Z",
        readTime: 5,
        category: "Central Jobs"
      },
      {
        slug: "rssb-lab-attendant-recruitment-2025",
        title: "RSSB Lab Attendant Recruitment 2025: A Complete Guide",
        excerpt: "The Rajasthan Staff Selection Board (RSSB) has released 54 vacancies for the Lab Attendant post under the Public Health Engineering Department (PHED). Online applications begin from 11 July 2025 and will close on 9 August 2025. This comprehensive guide includes eligibility criteria, important dates, required documents, step-by-step application process, selection procedure, FAQs, and final advice. A great opportunity for 10th pass candidates to join the Rajasthan government workforce in a technical support role.",
        featuredImage: "https://blackbuck.blob.core.windows.net/blackbucks-media/RSSB~Lab-Attendant-Recruitment-2025-square-1757217326535.png",
        publishedAt: "2025-07-11T09:00:00Z",
        readTime: 5,
        category: "State Jobs"
      },
      {
        slug: 'rajasthan-rssb-vdo-recruitment-2025-guide',
        title: 'RSSB Village Development Officer Recruitment 2025: A Complete Guide',
        excerpt: 'The Rajasthan Staff Selection Board (RSSB) has opened 850 vacancies for the prestigious Village Development Officer (VDO) post. Starting from 19 June 2025, eligible graduates with computer qualifications can apply online. This detailed guide outlines important dates, eligibility, required documents, step-by-step application process, exam pattern, and preparation tips. The VDO role is vital to rural governance in Rajasthan, offering a meaningful public service career. Apply by 18 July 2025 and begin your journey in grassroots development.',
        featuredImage: 'https://blackbuck.blob.core.windows.net/blackbucks-media/Screenshot_2025-06-30_105048.png-1751260909100',
        publishedAt: '2024-06-18T09:00:00Z',
        readTime: 5,
        category: 'State Jobs'
      },
      {
        slug: 'curaj-teaching-recruitment-2025',
        title: 'CURAJ Recruitment 2025: Apply for Professors, Associate & Assistant Professors',
        excerpt: 'The Central University of Rajasthan (CURAJ) has released a rolling advertisement for the recruitment of Professors, Associate Professors, and Assistant Professors in various departments. Online applications are open until August 11, 2025, followed by hardcopy submission by August 21. This guide covers eligibility criteria, department-wise vacancies, important dates, pay scale, application process, and FAQs.',
        featuredImage: 'https://blackbuck.blob.core.windows.net/blackbucks-media/CURAJ_Recruitment_2025.png-1751699244834',
        publishedAt: '2025-07-05T08:00:00Z',
        readTime: 7,
        category: 'State Jobs'
      },
      {
        slug: 'north-western-railway-nwr-sports-quota-recruitment-2025',
        title: 'NWR Sports Quota Recruitment 2025: Apply Online for 54 Railway Posts',
        excerpt: 'North Western Railway (NWR) has announced 54 vacancies under Sports Quota for Group C positions. Eligible sportspersons can apply online by August 10, 2025. This guide covers eligibility, discipline-wise vacancy details, pay levels, trial schedule, application process, and FAQs to help you apply smoothly.',
        featuredImage: 'https://blackbuck.blob.core.windows.net/blackbucks-media/NWR%E2%80%93Sports_Quota_Recruitment_2025.png-1752226895685',
        publishedAt: '2025-07-11T08:00:00Z',
        readTime: 6,
        category: 'State Jobs'
      }
    ]

    return allRelatedPosts
      .filter(post => post.slug !== currentSlug)
      .sort((a, b) => {
        if (a.category === category && b.category !== category) return -1
        if (b.category === category && a.category !== category) return 1
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    const availableSlugs = Object.keys(BLOG_POSTS)
    return availableSlugs.map(slug => ({ slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function incrementPostViews(slug: string): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'production') {
      await apiRequest(`/api/posts/${slug}/views`, {
        method: 'POST',
        next: { revalidate: 0 }
      })
    }
  } catch (error) {
    console.error('Failed to increment views:', error)
  }
}

export async function getAllBlogList() {
  try {
    return BLOG_LIST;
  } catch (error) {
    console.error("Blog list not found:", error);
    return [];
  }
}