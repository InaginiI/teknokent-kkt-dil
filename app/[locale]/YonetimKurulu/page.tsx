// app/yonetim-kurulu/page.tsx
"use client";

import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

import { HeroSection } from "./components/HeroSection";
import { CorporateCards } from "./components/CorporateCards";
import { BoardMembers } from "./components/BoardMembers";

import {
  IconBuildingBank,
  IconBriefcase,
  IconBaselineDensityMedium,
} from "@tabler/icons-react";
import { useTranslations } from 'next-intl';

function getCorporateInfo(t: any) {
  return [
    {
      title: t('corporateInfo.0.title'),
      description: t('corporateInfo.0.description'),
      icon: IconBuildingBank,
    },
    {
      title: t('corporateInfo.1.title'),
      description: t('corporateInfo.1.description'),
      icon: IconBriefcase,
    },
    {
      title: t('corporateInfo.2.title'),
      description: t('corporateInfo.2.description'),
      icon: IconBaselineDensityMedium,
    },
  ];
}
function getBoardMembers(t: any) {
  return [
    { name: t('boardMembers.0.name'), position: t('boardMembers.0.position'), image: "kızıltoprak.jpeg" },
    { name: t('boardMembers.1.name'), position: t('boardMembers.1.position'), image: "eracar.jpg" },
    { name: t('boardMembers.2.name'), position: t('boardMembers.2.position'), image: "kahveci.jpeg" },
    { name: t('boardMembers.3.name'), position: t('boardMembers.3.position'), image: "tunç.jpeg" },
    { name: t('boardMembers.4.name'), position: t('boardMembers.4.position'), image: "ergin.jpg" },
    { name: t('boardMembers.5.name'), position: t('boardMembers.5.position'), image: "hatipoğlu.jpg" },
    { name: t('boardMembers.6.name'), position: t('boardMembers.6.position'), image: "ozzyasar.jpg" },
    { name: t('boardMembers.7.name'), position: t('boardMembers.7.position'), image: "ozen.jpg" },
    { name: t('boardMembers.8.name'), position: t('boardMembers.8.position'), image: "yenipazar.jpg" },
    { name: t('boardMembers.9.name'), position: t('boardMembers.9.position'), image: "tekin.jpeg" },
    { name: t('boardMembers.10.name'), position: t('boardMembers.10.position'), image: "kazıcıoğlu.jpeg" }
  ];
}

export default function YonetimKuruluPage() {
  const t = useTranslations('YonetimKurulu');
  const corporateInfo = getCorporateInfo(t);
  const boardMembers = getBoardMembers(t);
  return (
    <>
      <Header />
      <HeroSection />
      <CorporateCards data={corporateInfo} />
      <BoardMembers members={boardMembers} />
      <FooterSection />
    </>
  );
}