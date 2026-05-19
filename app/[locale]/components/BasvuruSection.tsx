'use client'
import { Title,Container, Grid, SimpleGrid, Skeleton,Flex, Card, Image,Text, Center,GridColProps } from '@mantine/core';
import { IconFlare, IconProgressCheck, IconCopyCheck,IconFilterCheck } from '@tabler/icons-react';
import { Group } from 'lucide-react';
const PRIMARY_COL_HEIGHT = '400px';
import { useEffect, useState } from 'react';
import AOS from "aos";
import { useTranslations } from 'next-intl';

export function BasvuruSection() {
  const t = useTranslations("BasvuruSection");
  useEffect(() => {
        AOS.init({ duration: 800 }); // 800ms animasyon süresi
      }, []);
   return (
    <Container my="xl" px="md" size="xl" data-aos="fade-down">
      <Flex justify="center" align="center">
        <Title order={1} size={38} m={10} c="rgb(52, 73, 94)" data-aos="fade-down">
          {t('title')}
        </Title>
      </Flex>

      <Grid>
        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconFlare color="yellow" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                {t('cardTitle1')}
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                {t('cardDescription1')}
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconFilterCheck color="yellow" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                {t('cardTitle2')}
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                {t('cardDescription2')}
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconCopyCheck color="yellow" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={650} size="lg" mt="md" color="rgb(52, 73, 94)">
                {t('cardTitle3')}
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                {t('cardDescription3')}
              </Text>
            </Flex>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 4, lg: 3 }} data-aos="fade-down">
          <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
            <Card.Section>
              <Center pt="xl">
                <IconProgressCheck color="yellow" size={48} />
              </Center>
            </Card.Section>
            <Flex direction="column" justify="center" align="center" h="100%">
              <Text fw={640} size="xl" mt="md" color="rgb(52, 73, 94)">
                {t('cardTitle4')}
              </Text>
              <Text size="lg" c="dimmed" mt="xs" fw={500}>
                {t('cardDescription4')}
              </Text>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}