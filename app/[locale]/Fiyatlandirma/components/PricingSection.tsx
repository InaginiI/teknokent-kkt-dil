"use client";

import { Container, Grid, Card, Title, Text, Button, Box } from "@mantine/core";
import { useTranslations } from 'next-intl';

const pricingPlans = [
  {
    nameKey: "card1Title",
    price: "₺267,38 + KDV",
    features: ["feature1", "feature2", "feature3", "feature4"],
  },
  {
    nameKey: "card2Title",
    price: "₺350 +KDV",
    features: ["feature1", "feature2", "feature3", "feature4"],
  },
  {
    nameKey: "card3Title",
    price: "2335,50 +KDV",
    features: ["feature5", "feature6", "feature7", "feature8", "feature9", "feature10"],
  },
  {
    nameKey: "card4Title",
    price: "1000 +KDV",
    features: ["feature1", "feature2", "feature3", "feature4"],
  },
  {
    nameKey: "card5Title",
    price: "9000 +KDV",
    features: ["feature5", "feature6", "feature7", "feature8", "feature9", "feature10"],
  },
  {
    nameKey: "card6Title",
    price: "9000 +KDV",
    features: ["feature5", "feature6", "feature7", "feature8"],
  },
];

export function PricingSection() {
  const t = useTranslations('PricingSection');
  return (
    <Container size="lg" py={80}>
      <Title order={1} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
        {t('title')}
      </Title>
      <Title order={2} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
        {t('subtitle')}
      </Title>
      <Grid gutter="xl" justify="center">
        {pricingPlans.map(({ nameKey, price, features }, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Card
              shadow="sm"
              radius="md"
              withBorder
              padding="xl"
              style={{ textAlign: "center", height: "100%", display: "flex", flexDirection: "column" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <Title order={3} mb="xs" c="rgb(52, 73, 94)">
                {t(nameKey)}
              </Title>
              <Text size="xl" fw={700} mb="md" color="teal">
                {price}
              </Text>
              <Box mb="auto" style={{ textAlign: "left" }}>
                {features.map((feature, idx) => (
                  <Text key={idx} size="md" mb={4} color="dimmed">
                    • {t(feature)}
                  </Text>
                ))}
              </Box>
              <Button fullWidth mt="md" radius="md" color="teal" variant="outline" >
                {t('contactButton')}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
