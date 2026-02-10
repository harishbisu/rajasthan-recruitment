import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AnswerKey } from "../../types/exam-updates";
import AnswerKeyCard from "./answer-key-card";
import { GoogleAd } from "../ui/google-ad";

interface AnswerKeyListProps {
    items: AnswerKey[];
}

const AnswerKeyList: React.FC<AnswerKeyListProps> = ({ items }) => (
    <Grid
        gap={4}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        width="full"
        height={"fit-content"}
    >
        {items.map((item, idx) => (
            <React.Fragment key={`${item.id}-${idx}`}>
                <GridItem h="full">
                    <AnswerKeyCard data={item} />
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

export default AnswerKeyList;
