import React, { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import SidebarAd from "@/components/job/sidebar-ad";
import { TabsNavigation } from "@/components/ui/tab-navigation";
import { SEO } from "@/components/ui/SEO";
import { Pagination } from "@/components/ui/Pagination";
import AnswerKeyList from "@/components/answer-key/answer-key-list";
import { mockAnswerKeys } from "@/data/mock-data";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const pageSize = 10;
  // Using mock data for now as requested
  const jobs = mockAnswerKeys;
  const total = mockAnswerKeys.length;

  return (
    <Box p={{ base: 2, md: 4 }}>
      <SEO
        title={`Answer Key ${new Date().getFullYear()} - Check Exam Solutions & Keys`}
        description="Check official Rajasthan government job exam answer keys. Compare your answers and calculate scores with our updated key links."
        canonical="https://rajasthanrecruitment.in/ans-key"
      />
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
          Answer Key Notifications {new Date().getFullYear()}
        </Heading>

        <Stack
          mb={12}
          gap={4}
          w="full"
          position="relative"
          direction={{ base: "column", md: "row" }}
        >
          <AnswerKeyList items={jobs} />
          <SidebarAd />
        </Stack>

        <Suspense fallback={<Box h="50px" />}>
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={pageSize}
            path="/ans-key"
          // onPageChange={() => { }}
          />
        </Suspense>
      </Box>
    </Box>
  );
}
