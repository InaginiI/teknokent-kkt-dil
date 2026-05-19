"use client"

import { Box, Container, Title, Grid, Card, Text, Group, Stack } from "@mantine/core"
import Image from "next/image"
import { useEffect, useState } from 'react';
import AOS from "aos";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from 'next-intl';

const newsData = [
  {
    title: "Haber-1",
    imgSrc: "/professional-business-person.png",
    imgAlt: "Professional",
  },
  {
    title: "Haber-2",
    imgSrc: "/collaborative-business-team.png",
    imgAlt: "Team",
  },
  {
    title: "Haber-3",
    imgSrc: "/professional-business-person.png",
    imgAlt: "Professional",
  },
  {
    title: "Haber-4",
    imgSrc: "/collaborative-business-team.png",
    imgAlt: "Team",
  },
  {
    title: "Haber-5",
    imgSrc: "/professional-business-person.png",
    imgAlt: "Professional",
  },
  {
    title: "Haber-6",
    imgSrc: "/collaborative-business-team.png",
    imgAlt: "Team",
  },
  {
    title: "Haber-7",
    imgSrc: "/professional-business-person.png",
    imgAlt: "Professional",
  },
  {
    title: "Haber-8",
    imgSrc: "/collaborative-business-team.png",
    imgAlt: "Team",
  },
  
];



export function NewsSection() {
  const t = useTranslations("NewsSection");
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
          AOS.init({ duration: 800 }); // 800ms animasyon süresi
        }, []);
  return (

    
    <Box py={isMobile ? 40 : 80}  data-aos="fade-up">
      <Container size="xl">
        <Title order={2} size={isMobile ? 28 : 40} mb={isMobile ? 20 : 40} c="rgb(52, 73, 94)" data-aos="fade-up">
          {t('title')}
        </Title>

        <Swiper
          modules={[Navigation,Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : 2}
          navigation
          loop={true}
          autoplay={{delay:2000, disableOnInteraction: false}}
          className="mySwiper"
        >
          {newsData.map(({ title, imgSrc, imgAlt }, index) => (
            <SwiperSlide key={index}>
              <Card
                bg="rgb(52, 73, 94)"
               h={isMobile ? 200 : 250}
                p={isMobile ? "md" : "xl"}
                style={{
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Group align="flex-start" h="100%" data-aos="fade-up" >
                  <Stack flex={1} justify="space-between" h="100%">
                    <Box>
                      <Title order={3} c="white" size={isMobile ? 18 : 24} mb="md">
                        {title}
                      </Title>
                    </Box>
                  </Stack>
                  <Box w={isMobile ? 100 : 120} h={isMobile ? 100 : 120} pos="relative">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </Box>
                </Group>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  )
}
