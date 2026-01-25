'use client'
import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    Button,
    Flex,
    VStack,
    HStack,
    Container
} from '@chakra-ui/react';
import { Users, Award, Clock, ArrowRight, CheckCircle, Target, Eye, Building, Shield, TrendingUp, LucideIcon } from 'lucide-react';
import NextLink from 'next/link';

interface StatItem {
    icon: LucideIcon;
    label: string;
    value: number;
    suffix: string;
    color: string;
}

interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
}

interface TeamItem {
    name: string;
    description: string;
    icon: LucideIcon;
}

interface VisibilityMap {
    [key: string]: boolean;
}

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState<VisibilityMap>({});
    const [counters, setCounters] = useState<{ jobs: number; users: number; success: number }>({
        jobs: 95, users: 495, success: 90
    });

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        const animateCounter = (key: keyof typeof counters, target: number, duration = 1500) => {
            const startValue = target - 5;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.round(startValue + (5 * easeOutCubic));
                setCounters(prev => ({
                    ...prev,
                    [key]: Math.min(currentValue, target)
                }));
                if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
        };
        const timeouts = [
            setTimeout(() => animateCounter('jobs', 100), 800),
            setTimeout(() => animateCounter('users', 500), 1000),
            setTimeout(() => animateCounter('success', 95), 1200)
        ];
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => observer.observe(el));
        return () => {
            observer.disconnect();
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    const stats: StatItem[] = [
        { icon: Building, label: 'Government Jobs Listed', value: counters.jobs, suffix: '+', color: '#5d93fe' },
        { icon: Users, label: 'Active Job Seekers', value: counters.users, suffix: '+', color: '#38A169' },
        { icon: TrendingUp, label: 'Success Rate', value: counters.success, suffix: '%', color: '#805AD5' }
    ];

    const features: FeatureItem[] = [
        {
            icon: Target,
            title: 'Precision Targeting',
            description: 'Curated government openings with location-based filtering, exclusive to Rajasthani candidates.',
            color: '#5d93fe'
        },
        {
            icon: Clock,
            title: 'Real-Time Updates',
            description: 'Instant alerts for announcements, deadlines, and new job openings.',
            color: '#38A169'
        },
        {
            icon: Shield,
            title: 'Verified Sources',
            description: 'Every job posting is confirmed by official recruitment boards and government websites.',
            color: '#805AD5'
        }
    ];

    const team: TeamItem[] = [
        {
            name: 'Career Advisory',
            description: 'Professional advice on exam preparation, career planning, and application tactics.',
            icon: Target
        },
        {
            name: 'Technology Excellence',
            description: 'Modern platform development for a flawless user experience on all devices.',
            icon: Award
        },
        {
            name: 'Content Curation',
            description: 'Meticulously checking and presenting job details with precision.',
            icon: CheckCircle
        }
    ];

    return (
        <Box bg="white" minH="100vh">
            {/* Hero Section */}
            <Container maxW="6xl" pt={20} pb={12}>
                <VStack gap={6} textAlign="center">
                    <Box id="hero" data-animate opacity={isVisible?.hero ? 1 : 0} transform={isVisible.hero ? 'none' : 'translateY(30px)'} transition="all 0.8s ease-out">
                        <Heading
                            size="2xl"
                            fontWeight="800"
                            color="#5d93fe"
                            lineHeight="1.2"
                        >
                            About Rajasthan Recruitment
                        </Heading>
                        <Text fontSize="xl" color="gray.600" mt={4} maxW="2xl" mx="auto">
                            Your trusted portal for Rajasthan government job opportunities. Connecting aspirants with fulfilling public service careers.
                        </Text>
                    </Box>
                </VStack>
            </Container>

            {/* Statistics Section */}
            <Box bgGradient="linear(to-r, #eaf1ff, #f7faff)" py={16} >
                <Container maxW="6xl">
                    <VStack gap={10}>
                        <Heading size="lg" color="#5d93fe" mb={3} fontWeight="700">Platform Performance</Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mt={4} w="full">
                            {stats.map((stat, index) => (
                                <Box
                                    key={stat.label}
                                    id={`stat-${index}`}
                                    data-animate
                                    p={8}
                                    bg="white"
                                    borderRadius="2xl"
                                    border="2px solid"
                                    borderColor="#5d93fe"
                                    boxShadow="md"
                                    textAlign="center"
                                    transform={isVisible[`stat-${index}`] ? 'none' : 'translateY(30px)'}
                                    opacity={isVisible[`stat-${index}`] ? 1 : 0}
                                    transition={`all 0.7s ease-out ${0.1 * index}s`}
                                    _hover={{
                                        transform: 'translateY(-8px)',
                                        boxShadow: 'xl',
                                        borderColor: stat.color
                                    }}
                                >
                                    <Flex justify="center" mb={4}>
                                        <Box
                                            w={14}
                                            h={14}
                                            bg="#eaf1ff"
                                            borderRadius="xl"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Icon as={stat.icon} w={8} h={8} color={stat.color} />
                                        </Box>
                                    </Flex>
                                    <Heading fontSize="3xl" fontWeight="800" color={stat.color} mb={1}>
                                        {stat.value.toLocaleString()}{stat.suffix}
                                    </Heading>
                                    <Text color="gray.700" fontSize="md" fontWeight="500">
                                        {stat.label}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Mission & Vision */}
            <Container maxW="6xl" py={20}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
                    <Box
                        id="mission"
                        data-animate
                        opacity={isVisible?.mission ? 1 : 0}
                        transform={isVisible.mission ? 'none' : 'translateX(-40px)'}
                        transition="all 0.8s ease-out"
                    >
                        <Box
                            bg="white"
                            borderRadius="2xl"
                            p={8}
                            boxShadow="lg"
                            border="1px solid"
                            borderColor="#eaf1ff"
                            h="full"
                        >
                            <HStack gap={4} mb={6}>
                                <Flex
                                    w={12}
                                    h={12}
                                    bgGradient="linear(to-br, #5d93fe, #6b73ff)"
                                    borderRadius="xl"
                                    align="center"
                                    justify="center"
                                    boxShadow="md"
                                >
                                    <Icon as={Target} w={7} h={7} color="#5d93fe" />
                                </Flex>
                                <Heading fontSize="xl" color="#5d93fe">Our Mission</Heading>
                            </HStack>
                            <Text color="gray.600" fontSize="lg" lineHeight="1.8">
                                To provide a thorough, dependable, and easy-to-use platform that equips job seekers with precise information and tactical direction to democratize access to government career opportunities in Rajasthan.
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        id="vision"
                        data-animate
                        opacity={isVisible.vision ? 1 : 0}
                        transform={isVisible.vision ? 'none' : 'translateX(40px)'}
                        transition="all 0.8s ease-out 0.2s"
                    >
                        <Box
                            bgGradient="linear(to-br, #f7faff, #eaf1ff)"
                            borderRadius="2xl"
                            p={8}
                            border="2px solid"
                            borderColor="#805AD5"
                            h="full"
                            boxShadow="lg"
                        >
                            <HStack gap={4} mb={6}>
                                <Flex
                                    w={12}
                                    h={12}
                                    bgGradient="linear(to-br, #805AD5, #5d93fe)"
                                    borderRadius="xl"
                                    align="center"
                                    justify="center"
                                    boxShadow="md"
                                >
                                    <Icon as={Eye} w={7} h={7} color="#5d93fe" />
                                </Flex>
                                <Heading fontSize="xl" color="#805AD5">Our Vision</Heading>
                            </HStack>
                            <Text color="gray.700" fontSize="lg" lineHeight="1.8">
                                {`To establish itself as the leading digital ecosystem for government hiring in Rajasthan, promoting equality, efficiency, and transparency while strengthening the state's public service capacities.`}
                            </Text>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>

            {/* Features Section */}
            <Box bgGradient="linear(to-br, #eaf1ff, #f7faff)" py={20}>
                <Container maxW="6xl">
                    <VStack gap={12}>
                        <Box textAlign="center" id="features-title" data-animate opacity={isVisible['features-title'] ? 1 : 0} transform={isVisible['features-title'] ? 'none' : 'translateY(30px)'} transition="all 0.6s">
                            <Heading size="lg" color="#5d93fe" mb={2} fontWeight="700">Why Professionals Choose Us</Heading>
                            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                                Cutting-edge tools to speed up your career path in government
                            </Text>
                        </Box>
                        <SimpleGrid columns={{ base: 1, md: 3 }} mt={8} gap={8}>
                            {features.map((feature, index) => (
                                <Box
                                    key={feature.title}
                                    id={`feature-${index}`}
                                    data-animate
                                    p={8}
                                    bg="white"
                                    borderRadius="2xl"
                                    boxShadow="md"
                                    border="1px solid"
                                    borderColor="#5d93fe"
                                    transform={isVisible[`feature-${index}`] ? 'none' : 'translateY(40px)'}
                                    opacity={isVisible[`feature-${index}`] ? 1 : 0}
                                    transition={`all 0.7s ease-out ${0.2 * index}s`}
                                    _hover={{
                                        boxShadow: 'xl',
                                        transform: 'translateY(-10px)',
                                        borderColor: feature.color
                                    }}
                                    h="full"
                                >
                                    <Flex w={16} h={16} bg="#f7faff" borderRadius="xl" mb={6} align="center" justify="center">
                                        <Icon as={feature.icon} w={9} h={9} color={feature.color} />
                                    </Flex>
                                    <Heading fontSize="lg" mb={4} color={feature.color} fontWeight="700">{feature.title}</Heading>
                                    <Text color="gray.600" fontSize="md" lineHeight="1.7">
                                        {feature.description}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Team Section */}
            <Container maxW="6xl" py={20}>
                <VStack gap={12}>
                    <Box textAlign="center" id="team-title" data-animate opacity={isVisible['team-title'] ? 1 : 0} transform={isVisible['team-title'] ? 'none' : 'translateY(30px)'} transition="all 0.6s">
                        <Heading size="lg" color="#5d93fe" mb={2} fontWeight="700">Professional Support Ecosystem</Heading>
                        <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                            Specialized teams dedicated to your career advancement
                        </Text>
                    </Box>
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mt={8}>
                        {team.map((member, index) => (
                            <Box
                                key={member.name}
                                id={`team-${index}`}
                                data-animate
                                p={8}
                                bg="white"
                                borderRadius="2xl"
                                border="2px solid"
                                borderColor="#eaf1ff"
                                textAlign="center"
                                boxShadow="md"
                                transform={isVisible[`team-${index}`] ? 'none' : 'translateY(40px)'}
                                opacity={isVisible[`team-${index}`] ? 1 : 0}
                                transition={`all 0.7s ease-out ${0.15 * index}s`}
                                _hover={{
                                    transform: 'translateY(-8px) scale(1.02)',
                                    borderColor: '#5d93fe',
                                    boxShadow: 'xl'
                                }}
                                h="full"
                            >
                                <Flex w={20} h={20} bgGradient="linear(to-br, #5d93fe, #805AD5)" borderRadius="full" align="center" justify="center" mx="auto" mb={6} boxShadow="md">
                                    <Icon as={member.icon} w={10} h={10} color="#5d93fe" />
                                </Flex>
                                <Heading fontSize="lg" mb={4} color="#5d93fe" fontWeight="700">{member.name}</Heading>
                                <Text color="gray.600" fontSize="md" lineHeight="1.7">
                                    {member.description}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>

            {/* Call to Action */}
            <Box py={20} bgGradient="linear(to-r, #5d93fe, #805AD5)" color="white" position="relative" overflow="hidden">
                <Box position="absolute" inset={0} bgGradient="radial(circle at 30% 70%, rgba(255,255,255,0.08), transparent)" />
                <Container maxW="4xl" textAlign="center" position="relative">
                    <Box id="cta" data-animate opacity={isVisible.cta ? 1 : 0} transform={isVisible.cta ? 'none' : 'translateY(30px)'} transition="all 0.8s ease-out">
                        <Heading size="xl" mb={6} fontWeight="700" color="gray.800">
                            Ready to Grow in Your Government Career?
                        </Heading>
                        <Text fontSize="lg" mb={8} opacity={0.95} maxW="2xl" mx="auto" lineHeight="1.7" color="gray.800">
                            Join thousands of successful applicants who used our platform to find their dream Rajasthan government jobs.
                        </Text>
                        <NextLink href="/">
                            <Button
                                size="lg"
                                bg="white"
                                color="#5d93fe"
                                fontSize="lg"
                                fontWeight="700"
                                px={10}
                                py={6}
                                h="auto"
                                borderRadius="xl"
                                _hover={{
                                    bg: '#eaf1ff',
                                    color: '#805AD5',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '2xl'
                                }}
                                transition="all 0.3s ease"
                            >
                                Explore Opportunities <ArrowRight size={20} style={{ marginLeft: 8 }} />
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box >
        </Box >
    );
};

export default AboutUs;