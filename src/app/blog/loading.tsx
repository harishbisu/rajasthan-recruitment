'use client'
import { Box, Spinner, VStack } from '@chakra-ui/react';

const Loading = () => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg="whiteAlpha.900"
            zIndex={98}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <VStack spaceY={4}>
                <Spinner
                    borderWidth="4px"
                    animationDuration="0.65s"
                    color="#5d93fe"
                    size="xl"
                />
                {/* <Text fontSize="lg" color="gray.600">
                    Loading, please wait...
                </Text> */}
            </VStack>
        </Box>
    );
};

export default Loading;
