"use client"

import { Card, Stack, Avatar, Title, Text } from "@mantine/core"
import { useHover } from "@mantine/hooks"

export interface Person {
  name: string
  position: string
  photo: string
  alt?: string
}

interface PersonCardProps {
  person: Person
  size?: "sm" | "md" | "lg"
}

export function PersonCard({ person, size = "md" }: PersonCardProps) {
  const { hovered, ref } = useHover()

  const cardConfig = {
    sm: { avatarSize: 90, minHeight: 180, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", titleSize: "md" as const },
    md: { avatarSize: 110, minHeight: 200, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", titleSize: "lg" as const },
    lg: { avatarSize: 140, minHeight: 240, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", titleSize: "xl" as const },
  }

  const config = cardConfig[size]

  return (
    <Card
      ref={ref}
      shadow={hovered ? "xl" : "md"}
      padding="xl"
      radius="lg"
      style={{
        background: config.gradient,
        minHeight: config.minHeight,
        border: "3px solid rgba(255, 255, 255, 0.2)",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <Stack align="center" gap="md">
        <Avatar
          src={person.photo}
          alt={person.alt || person.name}
          size={config.avatarSize}
          radius="50%"
        />
        <Stack align="center" gap={4}>
          <Title order={3} size={config.titleSize} c="white" ta="center" fw={700}>
            {person.name}
          </Title>
          <Text size="sm" c="rgba(255, 255, 255, 0.9)" ta="center" fw={500}>
            {person.position}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}
