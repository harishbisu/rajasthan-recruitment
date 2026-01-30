import type { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";
import JobList from "@/components/job/job-list";
import SidebarAd from "@/components/job/sidebar-ad";
import { LandingMotivation } from "@/components/ui/landing-motivation";
import { TabsNavigation } from "@/components/ui/tab-navigation";
import { getAllJobs } from "@/lib/api/job";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { GoogleAd } from "@/components/ui/google-ad";

export const metadata: Metadata = {
  title: `Govt Jobs ${new Date().getFullYear()} - Latest Sarkari Naukri, Results, Admit Card | Rajasthan Recruitment`,
  description:
    "Get the latest Rajasthan government job notifications, exam results, admit cards, answer keys, and more. Stay updated with Rajasthan Recruitment for all Sarkari Naukri updates, online forms, and career opportunities in Rajasthan.",
  keywords: [
    "Rajasthan government jobs",
    "Sarkari Naukri Rajasthan",
    "Rajasthan job notifications",
    "Rajasthan exam results",
    "Admit card Rajasthan",
    "Rajasthan Recruitment Portal",
    "Sarkari Naukri",
    "Answer key Rajasthan",
    "Latest jobs Rajasthan",
    `Rajasthan Recruitment ${new Date().getFullYear()}`,
  ],
  alternates: {
    canonical: "https://rajasthanrecruitment.in/",
  },
  openGraph: {
    title: `Govt Jobs ${new Date().getFullYear()} - Latest Sarkari Naukri, Results, Admit Card | Rajasthan Recruitment`,
    description:
      "Get the latest Rajasthan government job notifications, exam results, admit cards, answer keys, and more. Stay updated with Rajasthan Recruitment for all Sarkari Naukri updates, online forms, and career opportunities in Rajasthan.",
    url: "https://rajasthanrecruitment.in/",
    siteName: "Rajasthan Recruitment",
    images: [
      {
        url: "https://rajasthanrecruitment.in/rr-home.jpg",
        width: 1200,
        height: 630,
        alt: "Rajasthan Recruitment Portal Home Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Govt Jobs ${new Date().getFullYear()} - Latest Sarkari Naukri, Results, Admit Card | Rajasthan Recruitment`,
    description:
      "Get the latest Rajasthan government job notifications, exam results, admit cards, answer keys, and more. Stay updated with Rajasthan Recruitment for all Sarkari Naukri updates, online forms, and career opportunities in Rajasthan.",
    images: ["https://rajasthanrecruitment.in/rr-home.jpg"],
  },
};

import { SEO } from "@/components/ui/SEO";
import { Pagination } from "@/components/ui/Pagination";
import { Suspense } from "react";

async function App({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const query = params.q || "";
  const pageSize = 10;
  const { jobs, total } = await getAllJobs({
    query,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  return (
    <Box
      className="App"
      // minH="100vh"
      p={{ sm: 2, md: 4 }}
      position={"relative"}
    >
      <SEO
        title={
          query
            ? `Search results for "${query}" | Govt Jobs`
            : `Govt Jobs ${new Date().getFullYear()} - Latest Sarkari Naukri, Results, Admit Card`
        }
        description={
          query
            ? `Browse all Rajasthan government job results for "${query}".`
            : "Get the latest Rajasthan government job notifications, exam results, admit cards, answer keys, and more."
        }
        keywords={[
          "Rajasthan government jobs",
          "Sarkari Naukri",
          "Admit card",
          "Result",
        ]}
        canonical="https://rajasthanrecruitment.in/"
      />
      <LandingMotivation />
      <Box position={"relative"} mb={8}>
        <Box zIndex={98} position="sticky" top={"74px"}>
          <TabsNavigation />
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          color="#5d93fe"
          mt={6}
          pl={2}
          borderLeft={"4px solid #5d93fe"}
          borderRadius={"md"}
        >
          Latest Government Jobs {new Date().getFullYear()}
        </Heading>
        <Stack
          mb={6}
          gap={4}
          w="full"
          h={"fit-content"}
          position="relative"
          direction={{ base: "column", md: "row" }}
        >
          <JobList jobs={jobs} />
          <SidebarAd />
        </Stack>
        <HStack w={"full"} display={"flex"} justifyContent={"center"}>
          <Suspense fallback={<Box h="50px" />}>
            <Pagination
              currentPage={page}
              totalCount={total}
              pageSize={pageSize}
              path="/"
            />
          </Suspense>
        </HStack>
      </Box>
      <BlogList />
      <GoogleAd type="multiplex" slot="4568995773" />
    </Box>
  );
}

export default App;
