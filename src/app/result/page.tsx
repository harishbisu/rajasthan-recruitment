import React, { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import SidebarAd from "@/components/job/sidebar-ad";
import { TabsNavigation } from "@/components/ui/tab-navigation";
import { Pagination } from "@/components/ui/Pagination";
import ResultList from "@/components/result/result-list";
import { mockResults } from "@/data/mock-data";
import { Metadata } from "next";
import { generateDynamicDescription, generateDynamicKeywords } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `Exam Results ${new Date().getFullYear()} - Check Latest Merit Lists | Rajasthan Recruitment`,
  description: generateDynamicDescription(mockResults, "Exam Results"),
  keywords: generateDynamicKeywords(mockResults, ["Exam Result", "Rajasthan Result", "Merit List"]),
  alternates: {
    canonical: "https://rajasthanrecruitment.in/result",
  },
  openGraph: {
    title: `Exam Results ${new Date().getFullYear()} - Check Latest Merit Lists | Rajasthan Recruitment`,
    description: generateDynamicDescription(mockResults, "Exam Results"),
    url: "https://rajasthanrecruitment.in/result",
    siteName: "Rajasthan Recruitment",
    images: [
      {
        url: "https://rajasthanrecruitment.in/rr-home.jpg",
        width: 1200,
        height: 630,
        alt: "Rajasthan Recruitment Portal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Exam Results ${new Date().getFullYear()} - Check Latest Merit Lists | Rajasthan Recruitment`,
    description: generateDynamicDescription(mockResults, "Exam Results"),
    images: ["https://rajasthanrecruitment.in/rr-home.jpg"],
  },
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const pageSize = 10;
  // Using mock data
  const jobs = mockResults;
  const total = mockResults.length;

  return (
    <Box p={{ base: 2, md: 4 }}>
      <Box mx="auto" position="relative" pb={12}>
        <Box zIndex={98} position="sticky" top={"73px"} mb={6}>
          <TabsNavigation />
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: "xl", md: "2xl", lg: "32px" }}
          color="#3c4043"
          mb={6}
          fontWeight="700"
          borderBottom="3px solid #4285f4"
          pb={2}
          display="inline-block"
        >
          Exam Result Notifications {new Date().getFullYear()}
        </Heading>

        <Stack
          mb={12}
          gap={4}
          w="full"
          position="relative"
          direction={{ base: "column", md: "row" }}
        >
          <ResultList items={jobs} />
          <SidebarAd />
        </Stack>

        <Suspense fallback={<Box h="50px" />}>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={pageSize}
            path="/result"
          />
        </Suspense>
      </Box>
    </Box>
  );
}
