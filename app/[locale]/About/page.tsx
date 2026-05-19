"use client";

import { Box } from "@mantine/core";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { AboutHero } from "./components/AboutHero";
import { AboutAccordion } from "./components/AboutAccordion";
import AOS from "aos";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Header />
      <Box
        py={60}
        style={{
          paddingTop: 100,
          backgroundColor: "rgb(52, 73, 94)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <AboutHero />
        <AboutAccordion />
      </Box>
      <FooterSection />
    </>
  );
}
