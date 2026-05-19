"use client";

import { useState } from "react";
import { Accordion, Title, Text, Container } from "@mantine/core";
import { IconAffiliate, IconApiApp } from "@tabler/icons-react";
import { useTranslations } from 'next-intl';

export function AboutAccordion() {
  const [opened, setOpened] = useState<string | null>("hakkimizda");
  const t = useTranslations('AboutAccordion');

  return (
    <Container size="xl" data-aos="fade-up">
      <Title order={1} style={{ color: "white", height: "60px" }}>
        {t('title')}
      </Title>
      <Title order={3} mb={40} style={{ color: "white" }}>
        {t('subtitle')}
      </Title>

      <Accordion
        variant="separated"
        radius="md"
        value={opened}
        onChange={setOpened}
        styles={{
          item: { backgroundColor: "white", color: "rgb(52, 73, 94)" },
          control: { fontWeight: 600 },
          panel: { color: "rgb(52, 73, 94)", fontSize: 16, lineHeight: 1.5 },
        }}
      >
        <Accordion.Item value="hakkimizda">
          <Accordion.Control>
            <Text fw={600} size="xl" color="rgb(52, 73, 94)">
              {t('title')}
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <Title order={4} c="rgba(182, 180, 101, 1)">
              {t('subtitle2')}
            </Title>
            {t('description1')}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="misyonumuz">
          <Accordion.Control>
            <Text fw={500} size="xl" color="rgb(52, 73, 94)">
              {t('title2')}
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <IconAffiliate size={36} color="rgba(182, 180, 101, 1)" />
            {t('description2')}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="vizyonumuz">
          <Accordion.Control>
            <Text fw={500} size="xl" color="rgb(52, 73, 94)">
              {t('title3')}
            </Text>
          </Accordion.Control>
          <Accordion.Panel style={{ fontSize: "17px" }}>
            <IconApiApp size={36} color="rgba(182, 180, 101, 1)" />
            {t('description3')}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}