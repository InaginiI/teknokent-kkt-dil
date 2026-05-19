"use client";

import { Container, Title } from "@mantine/core";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "@mantine/hooks";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const companies = [
  { name: 'company1', logo: "/logo.png", link: "#" },
  { name: 'company2', logo: "/logo.png", link: "#" },
  { name: 'company3', logo: "/logo.png", link: "#" },
  { name: 'company4', logo: "/logo.png", link: "#" },
  { name: 'company5', logo: "/logo.png", link: "#" },
  { name: 'company6', logo: "/logo.png", link: "#" },
  { name: 'company1', logo: "/logo.png", link: "#" },
  { name: 'company2', logo: "/logo.png", link: "#" },
  { name: 'company3', logo: "/logo.png", link: "#" },
  { name: 'company4', logo: "/logo.png", link: "#" },
  { name: 'company5', logo: "/logo.png", link: "#" },
  { name: 'company6', logo: "/logo.png", link: "#" },
];


export default function Firmalar() {
  const t = useTranslations('Firmalar');
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container my="xl" size="xl">
      <Title order={2} size={38} m={43} ta="center" mb="lg" c="rgb(52, 73, 94)">
        {t('title')}
      </Title>

      <div className="firmalarSwiper" style={{minHeight: isMobile ? 200 : 300,}}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: true, }}
    speed={2000}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 5, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
          style={{minHeight:300}}
        >
          {companies.map((company, i) => (
            <SwiperSlide key={i}>
              <a
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  src={company.logo}
                  alt={t(company.name)}
                  width={140}
                  height={140}
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    border: "2px solid #ddd",
                    padding: "5px",
                    backgroundColor: "#fff",
                  }}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}
