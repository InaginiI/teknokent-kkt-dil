"use client"

import { Container, Center, Box, Grid, Stack } from "@mantine/core"
import { Header } from "../components/Header";
import { HeroSection } from "./components/HeroSection"
import { FooterSection } from "../components/FooterSection";
import { PersonCard, Person } from "./components/PersonCard"
import { DepartmentSection } from "./components/DepartmentSection"

// --- Sample Data ---
const managementTeam = {
  ceo: { name: "Doç. Dr. Durmuş ÖZDEMİR", position: "Genel Müdür", photo: "", alt: "CEO" },
  departments: [
    {
      head: { name: "Yunus Emre TELLİ", position: "İdari ve Mali İşler Koordinatörlüğü", photo: "", alt: "" },
      members: [
        { name: "Lütfullaf ARVAS", position: "Destek Personeli", photo: "", alt: "" },
        { name: "Nurten AKKAŞ", position: "Destek Personeli", photo: "", alt: "" },
        { name: "Hatice KÜÇÜKARSLAN", position: "Destek Personeli", photo: "", alt: "" },
        { name: "Ayşe GÖDE", position: "Destek Personeli", photo: "", alt: "" },
      ],
    },
    {
      head: { name: "M. Emin BEYTÜL", position: "Kurumsal İletişim Koordinatörlüğü", photo: "", alt: "" },
      members: [],
    },
    {
      head: [
        { name: "Muhammed BEKMEZCİ", position: "Girişimcilik ve Proje Koordinatörlüğü", photo: "", alt: "" },
      ],
      members: [],
    },
     {
      head: [
        { name: "Merve AKIN", position: "Girişimcilik ve Proje Koordinatörlüğü", photo: "", alt: "" },
      ],
      members: [],
    },
  ],
}

export default function TeknokentYonetimPage() {
  return (
    <>
      <Header />
      <HeroSection />

    <Container size="xl" py="xl">
  <Center mb="xl">
    <Box maw={320}>
      <PersonCard person={managementTeam.ceo} size="lg" />
    </Box>
  </Center>

  {/* Departmanlar Grid */}
  <Grid gutter="xl" justify="center">
    {managementTeam.departments.map((dept, index) => {
      const head = Array.isArray(dept.head) ? dept.head[0] : dept.head
      return (
        <Grid.Col key={index} span={4}  style={{ minWidth: 250 }}>
          {head && <DepartmentSection head={head} members={dept.members} />}
        </Grid.Col>
      )
    })}
  </Grid>
</Container>


      <FooterSection />
    </>
  )
}
