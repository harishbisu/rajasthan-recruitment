'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import EmotionRegistry from '@/components/ui/emotion-registry';

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
    return (
        <EmotionRegistry>
            <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
        </EmotionRegistry>
    );
}
