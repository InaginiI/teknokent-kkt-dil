"use client"

import { Stack, Grid, } from "@mantine/core"
import { Person, PersonCard } from "./PersonCard"

interface DepartmentSectionProps {
  head: Person | Person[]
  members: Person[]
}

export function DepartmentSection({  head, members }: DepartmentSectionProps) {
  // head'i array olarak kullan
  const heads = Array.isArray(head) ? head : [head]

  return (
    <Stack gap="lg">
      {/* Departman başları */}
      <Grid gutter="sm">
        {heads.map((h, index) => (
          <Grid.Col key={index} span={6} style={{ display: "flex", justifyContent: "center" }}>
            <PersonCard person={h} size="md" />
          </Grid.Col>
        ))}
      </Grid>

      {/* Departman üyeleri */}
      <Grid gutter="sm">
        {members.map((m, index) => (
          <Grid.Col key={index} span={6} style={{ display: "flex", justifyContent: "center" }}>
            <PersonCard person={m} size="sm" />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}