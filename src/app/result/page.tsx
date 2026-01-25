import React from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';
import JobList from '@/components/job/job-list';
import SidebarAd from '@/components/job/sidebar-ad';
import { getAllJobs } from '@/lib/api/job';
import { TabsNavigation } from '@/components/ui/tab-navigation';

// export const dynamic = 'force-static'; 

import { SEO } from '@/components/ui/SEO';
import { Pagination } from '@/components/ui/Pagination';

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Number((await searchParams).page) || 1;
  const pageSize = 10;
  const { jobs, total } = await getAllJobs({ category: 'result', limit: pageSize, offset: (page - 1) * pageSize });

  return (
    <Box p={{ base: 2, md: 4 }}>
      <SEO
        title={`Exam Results ${new Date().getFullYear()} - Check Latest Merit Lists`}
        description="Check official Rajasthan government job exam results and merit lists. Stay updated with the latest results and selection lists."
        canonical="https://rajasthanrecruitment.in/result"
      />
      <Box mx="auto" position="relative" pb={12}>
        <Box
          zIndex={98}
          position="sticky"
          top={'73px'}
          mb={6}
        >
          <TabsNavigation />
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: 'xl', md: '2xl', lg: '32px' }}
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
          direction={{ base: 'column', md: 'row' }}
        >
          <JobList jobs={jobs} />
          <SidebarAd />
        </Stack>

        <Pagination
          currentPage={page}
          totalCount={total}
          pageSize={pageSize}
          path='/result'
        />
      </Box>
    </Box>
  );
}
