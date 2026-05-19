import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container, Grid, Card, Text, rem } from '@mantine/core';
import { IconBuildingStore, IconPhoneCall, IconUserCircle, IconFileCheck } from '@tabler/icons-react';

export default function HeroCards() {
  const t = useTranslations('HeroCards');
  const cards = [
    { title: t('companies'), icon: <IconBuildingStore size={48} />, link: '' },
    { title: t('contact'), icon: <IconPhoneCall size={48} />, link: '' },
    { title: t('aboutus'), icon: <IconUserCircle size={48} />, link: '' },
    { title: t('apply'), icon: <IconFileCheck size={48} />, link: '' },
  ];

  return (
    <Container size="lg" style={{ marginTop: rem(-80), position: 'relative', zIndex: 10, maxWidth: '95%', }}>
      <Grid gutter="xl" justify="center" style={{ flexWrap: 'wrap' }}>
        {cards.map((card, i) => {
          const [hovered, setHovered] = useState(false);

          return (
            <Grid.Col
              key={i}
              span={3}
              style={{ display: 'flex', justifyContent: 'center',minWidth: rem(280), // Kartların küçülürken alt alta geçmesi için min-width
                marginBottom: rem(20), }}
            >
              <Card
                shadow="sm"
                radius="md"
                padding="xl"
                withBorder={true}
                style={{
                  backgroundColor: hovered ? 'rgb(52, 73, 94)' : '#ffffff',
                  textAlign: 'center',
                  height: rem(310),
                  width: '100%',
                  maxWidth: rem(300),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  color: hovered ? 'white' : 'rgba(182, 180, 101, 1)',
                 
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => window.location.href = card.link}
                
              >
                <div style={{ marginBottom: rem(20) }}>
                  {card.icon}
                </div>

                <Text fw={700} size="xl" mb="xs" style={{ color: 'rgb(52, 73, 94)' }}>
                  {card.title}
                </Text>

                <Text size="sm" style={{ color: hovered ? 'white' : 'dimmed' }}>
                  {t('detail')} &rarr;
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
