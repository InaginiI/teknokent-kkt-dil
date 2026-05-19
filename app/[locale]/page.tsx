// "use client";

// import { Header } from "./components/Header"
// import { HeroSection } from "./components/HeroSection"
// import { CorporateSection } from "./components/CorporateSection"
// import { NewsSection } from "./components/NewsSection"
// import { ServicesSection } from "./components/ServicesSection"
// import { Container } from "@mantine/core"
// import {FooterSection} from "./components/FooterSection"
// import {BasvuruSection} from "./components/BasvuruSection"
// import Firmalar from "./components/Firmalar"
// import  HeroCards  from "./components/HeroCards"

// export default function HomePage() {
//   return (
//     <>
//       <Header />
//       <HeroSection />
//       <HeroCards/>
//       <Container size="xl" px="md">
//         <CorporateSection />
//         <Firmalar/>
//         <BasvuruSection/>
//         <NewsSection />
//         <ServicesSection />
//       </Container>
//       <FooterSection/>
//     </>
//   )
// }


'use client'

import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/navigation'

import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"
import { CorporateSection } from "./components/CorporateSection"
import { NewsSection } from "./components/NewsSection"
import { ServicesSection } from "./components/ServicesSection"
import { Container } from "@mantine/core"
import {FooterSection} from "./components/FooterSection"
import {BasvuruSection} from "./components/BasvuruSection"
import Firmalar from "./components/Firmalar"
import HeroCards from "./components/HeroCards"

export default function HomePage() {
  const t = useTranslations('HomePage') // messages/HomePage namespace

  return (
    <>
      <Header />
      <HeroSection />
      <HeroCards/>
      <Container size="xl" px="md">
        <CorporateSection />
        <Firmalar/>
        <BasvuruSection/>
        <NewsSection />
        <ServicesSection />
      </Container>
      <FooterSection/>
    </>
  )
}

