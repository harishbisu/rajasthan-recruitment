import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import JobList from "@/components/job/job-list";
import SidebarAd from "@/components/job/sidebar-ad";
import { getAllJobs } from "@/lib/api/job";
import { TabsNavigation } from "@/components/ui/tab-navigation";
import { SEO } from "@/components/ui/SEO";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const { slug } = params;
  const { jobs } = await getAllJobs({ category: slug });

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Box p={{ base: 2, md: 4 }}>
      <SEO
        title={`${categoryName} Notifications ${new Date().getFullYear()}`}
        description={`Get the latest ${categoryName} notifications, dates, and application details for Rajasthan government jobs.`}
        canonical={`https://rajasthanrecruitment.in/category/${slug}`}
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
          {categoryName} Updates {new Date().getFullYear()}
        </Heading>

        <Stack
          mb={12}
          gap={4}
          w="full"
          position="relative"
          direction={{ base: "column", md: "row" }}
        >
          <JobList jobs={jobs} />
          <SidebarAd />
        </Stack>
      </Box>
    </Box>
  );
}
