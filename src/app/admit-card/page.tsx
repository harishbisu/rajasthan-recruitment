import React, { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import SidebarAd from "@/components/job/sidebar-ad";
import { TabsNavigation } from "@/components/ui/tab-navigation";
import { Pagination } from "@/components/ui/Pagination";
import AdmitCardList from "@/components/admit-card/admit-card-list";
import { mockAdmitCards } from "@/data/mock-data";
import { Metadata } from "next";
import {
  generateDynamicDescription,
  generateDynamicKeywords,
} from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: `Admit Card ${new Date().getFullYear()} - Download Latest Exam Hall Tickets | Rajasthan Recruitment`,
  description: generateDynamicDescription(mockAdmitCards, "Admit Cards"),
  keywords: generateDynamicKeywords(mockAdmitCards, [
    "Admit Card",
    "Rajasthan Admit Card",
    "Hall Ticket",
  ]),
  alternates: {
    canonical: "https://rajasthanrecruitment.in/admit-card",
  },
  openGraph: {
    title: `Admit Card ${new Date().getFullYear()} - Download Latest Exam Hall Tickets | Rajasthan Recruitment`,
    description: generateDynamicDescription(mockAdmitCards, "Admit Cards"),
    url: "https://rajasthanrecruitment.in/admit-card",
    siteName: "Rajasthan Recruitment",
    images: [
      {
        url: "https://rajasthanrecruitment.in/rr-home.avif",
        width: 1200,
        height: 630,
        alt: "Rajasthan Recruitment Portal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Admit Card ${new Date().getFullYear()} - Download Latest Exam Hall Tickets | Rajasthan Recruitment`,
    description: generateDynamicDescription(mockAdmitCards, "Admit Cards"),
    images: ["https://rajasthanrecruitment.in/rr-home.avif"],
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
  const jobs = mockAdmitCards;
  const total = mockAdmitCards.length;

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
          Admit Card Notifications {new Date().getFullYear()}
        </Heading>

        <Stack
          mb={12}
          gap={4}
          w="full"
          position="relative"
          direction={{ base: "column", md: "row" }}
        >
          <AdmitCardList items={jobs} />
          <SidebarAd />
        </Stack>

        <Suspense fallback={<Box h="50px" />}>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={pageSize}
            path="/admit-card"
          />
        </Suspense>
      </Box>
    </Box>
  );
}
