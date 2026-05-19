"use client"

import { Box, Container, Title, Grid, Card, Text, Stack } from "@mantine/core"
import Image from "next/image"
import { useEffect, useState } from 'react';
import AOS from "aos";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from 'next-intl';

export function CorporateSection() {
  const t = useTranslations("CorporateSection");
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
      AOS.init({ duration: 800 }); // 800ms animasyon süresi
    }, []);


  return (
    <Box py={isMobile?40:80} data-aos="fade-down">
      <Container size="xl"style={{ maxWidth: isMobile ? "95%" : "80%", marginLeft: "auto", marginRight: "auto" }}>
        <Title order={2} size={isMobile ? 28 : 40} mb={isMobile ? 20 : 40} c="rgb(52, 73, 94)">
          {t('title')}
        </Title>

        <Grid data-aos="fade-down" gutter={isMobile?"md":"xl"}>
          <Grid.Col span={isMobile?12:4} >
            <Card bg="rgb(52, 73, 94)" h={isMobile ? 150 : 200} p={isMobile ? "md" : "xl"} style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}>
              <Stack justify="center" align="center" h="100%">
                <Box c="white" size={isMobile ? 36 : 48}>
                  <svg width={isMobile ? 36 : 48} height={isMobile ? 36 : 48} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </Box>
                <Text c="white" fw={600} ta="center" fz={isMobile ? 14 : 16}>
                  Technology Solutions
                </Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={isMobile ? 12 : 4}>
  <Card
    h={isMobile ? 180 : 200}
    p={0}
    pos="relative"  // buraya pozisyon ekledim
    style={{
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <Image
      src="/modern-office-exterior.png"
      alt="DECOVES Building"
      fill
      style={{ objectFit: "cover" }}
    />
    <Box pos="absolute" bottom={0} left={0} right={0} bg="rgba(0,0,0,0.7)" p="md">
      <Text c="white" fw={600}>
        DECOVES
      </Text>
      <Text c="white" size={isMobile ? "xs" : "sm"}>
        Innovative business solutions and consulting services
      </Text>
    </Box>
  </Card>
</Grid.Col>


          <Grid.Col span={isMobile ? 12 : 4}>
  <Card
    h={isMobile ? 180 : 200}
    p={0}
    pos="relative"
    style={{
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <Image
      src="/professional-business-team-meeting.png"
      alt="Business Team"
      fill
      style={{ objectFit: "cover" }}
    />
  </Card>
</Grid.Col>

        </Grid>
      </Container>
    </Box>
  );
}
