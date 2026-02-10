import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { AdmitCard } from "../../types/exam-updates";
import AdmitCardCard from "./admit-card-card";
import { GoogleAd } from "../ui/google-ad";

interface AdmitCardListProps {
    items: AdmitCard[];
}

const AdmitCardList: React.FC<AdmitCardListProps> = ({ items }) => (
    <Grid
        gap={4}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        width="full"
        height={"fit-content"}
    >
        {items.map((item, idx) => (
            <React.Fragment key={`${item.id}-${idx}`}>
                <GridItem h="full">
                    <AdmitCardCard data={item} />
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

export default AdmitCardList;
