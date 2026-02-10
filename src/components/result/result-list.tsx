import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ExamResult } from "../../types/exam-updates";
import ResultCard from "./result-card";
import { GoogleAd } from "../ui/google-ad";

interface ResultListProps {
    items: ExamResult[];
}

const ResultList: React.FC<ResultListProps> = ({ items }) => (
    <Grid
        gap={4}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        width="full"
        height={"fit-content"}
    >
        {items.map((item, idx) => (
            <React.Fragment key={`${item.id}-${idx}`}>
                <GridItem h="full">
                    <ResultCard data={item} />
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

export default ResultList;
