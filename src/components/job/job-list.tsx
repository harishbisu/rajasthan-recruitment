import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import type { Job } from "../../types";
import JobCard from "./job-card";
import { GoogleAd } from "../ui/google-ad";

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => (
  <Grid
    gap={4}
    templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
    width="full"
    height={"fit-content"}
  >
    {jobs.map((job, idx) => (
      <React.Fragment key={`${job.id}-${idx}`}>
        <GridItem h="full">
          <JobCard job={job} />
        </GridItem>

        {(idx + 1) % 4 === 0 && (
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <GoogleAd type="in-feed" slot="4568995773" />
          </GridItem>
        )}
      </React.Fragment>
    ))}
  </Grid>
);

export default JobList;
