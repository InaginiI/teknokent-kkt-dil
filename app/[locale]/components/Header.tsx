"use client"

import {
  Container,
  Burger,
  Drawer,
  Group,
  Grid,
  Text,
  Box,
  Anchor,
  TextInput,
  Menu,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const [opened, setOpened] = useState(false);
  const [kurumsalOpen, setKurumsalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Box pos="absolute" top={0} left={0} right={0} style={{ zIndex: 10 }}>
      <Box
        bg="rgba(255, 255, 255, 0)"
        py="md"
        px="md"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <Container size="xl">
          <Grid align="center" justify="space-between">
            <Grid.Col span={{ xs: 12, md: 6 }}>
              <Group
                justify="flex-start"
                align="center"
                style={{ width: "100%", overflow: "visible" }}
              >
                <Group
                  style={{ gap: "md", overflow: "visible" }}
                  align="center"
                  justify="flex-start"
                >
                  <Link href="/" passHref >
                    
                      <Image
                        src="/logo.png"
                        alt="University Logo"
                        width={90}
                        height={90}
                      />
                    
                  </Link>
                  <Box>
                    <Text
                      size="xl"
                      fw={520}
                      c="white"
                      style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: "1.2em",
                      }}
                    >
                      {t('title1')}
                    </Text>
                    <Text
                      size="xl"
                      fw={520}
                      c="white"
                      style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: "1.2em",
                      }}
                    >
                      {t('title2')}
                    </Text>
                  </Box>
                </Group>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ xs: 12, md: 6 }}>
              {!isMobile ? (
                <Group
                  style={{ gap: "md", flexWrap: "nowrap", overflow: "visible" }}
                  align="center"
                  justify="flex-end"
                >
                  {["about", "corporate", "companies", "documents", "help", "contact", "media", "language"].map((key) => {
                    const label = t(key);
                    if (key === "corporate") {
                      return (
                        <Menu
                          key={label}
                          trigger="hover"
                          openDelay={100}
                          closeDelay={300}
                          withArrow
                        >
                          <Menu.Target>
                            <Button
                              variant="subtle"
                              color="white"
                              px="sm"
                               style={{ fontWeight: 450, fontSize: 18, cursor: "pointer", color: "white",  // CSS ile renk verelim
      minWidth: 110,   // buton genişliği yazıyı tam sarsın diye
      whiteSpace: "nowrap",  }}
                            >
                              {label}
                            </Button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {[
                              { key: "aboutDropdown", href: "/About" },
                              { key: "boardDropdown", href: "/YonetimKurulu" },
                              { key: "managementDropdown", href: "/TeknokentYonetim" },
                              { key: "pricingDropdown", href: "/Fiyatlandirma" },
                              { key: "newsDropdown", href: "#" },
                              { key: "eventsDropdown", href: "#" },
                            ].map((item) => (
                              <Menu.Item key={item.key} component={Link} href={item.href}>
                                {t(item.key)}
                              </Menu.Item>
                            ))}
                          </Menu.Dropdown>
                        </Menu>
                      );
                    } 
                    else if (key === "language") {
                      return (
                        <Menu
                          key={label}
                          trigger="hover"
                          openDelay={100}
                          closeDelay={300}
                          withArrow
                        >
                          <Menu.Target>
                            <Button
                              variant="subtle"
                              color="white"
                              px="sm"
                              style={{ fontWeight: 450, fontSize: 18, cursor: "pointer", color: "white", minWidth: 110, whiteSpace: "nowrap" }}
                            >
                              {label}
                            </Button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {[
                              { label: "Türkçe", value: "tr" },
                              { label: "İngilizce", value: "en" },
                            ].map((item) => (
                              <Menu.Item key={item.value} onClick={() => {
                                window.location.pathname = `/${item.value}${window.location.pathname.slice(3)}`;
                              }}>
                                {item.label}
                              </Menu.Item>
                            ))}
                          </Menu.Dropdown>
                        </Menu>
                      );
                    }
                    else {
                      // Sayfa linklerini anahtar ile eşleştir
                      const hrefMap = {
                        about: "/About",
                        corporate: "#",
                        companies: "#",
                        documents: "#",
                        help: "#",
                        contact: "#",
                        media: "#"
                      };
                      return (
                        <Anchor
                          key={key}
                          href={hrefMap[key as keyof typeof hrefMap] || "#"}
                          c="white"
                          td="none"
                          fw={450}
                          size="lg"
                          className="nav-link"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {label}
                        </Anchor>
                      );
                    }
                  })}

                  <TextInput
                    placeholder="Ara..."
                    leftSection={<IconSearch size={16} />}
                    radius="xl"
                    size="sm"
                    styles={{
                      input: {
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        maxWidth: "100%",
                        height: 24,
                        fontSize: 13,
                      },
                    }}
                  />
                </Group>
              ) : (
                <Group
                  justify="flex-end"
                  align="center"
                  style={{ width: "100%", overflow: "visible" }}
                >
                  <Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    aria-label="Toggle navigation"
                  />
                </Group>
              )}
            </Grid.Col>
          </Grid>
        </Container>

        {/* Mobil Drawer Menüsü */}
        <Drawer
          opened={opened}
          onClose={() => {
            setOpened(false);
            setKurumsalOpen(false);
          }}
          padding="md"
          size="md"
          position="right"
        >
          <TextInput
            placeholder="Ara..."
            rightSection={<IconSearch size={16} />}
            radius="xl"
            size="md"
            styles={{
              input: {
                width: "100%",
                fontSize: 13,
              },
            }}
          />

          {["about", "corporate", "companies", "documents", "help", "contact", "media"].map((key) => {
            const label = t(key);
            if (key === "corporate") {
              return (
                <Box key={label}>
                  <Anchor
                    onClick={() => setKurumsalOpen(!kurumsalOpen)}
                    c="dark"
                    td="none"
                    fw={450}
                    size="lg"
                    style={{
                      display: "block",
                      margin: "1rem",
                      color: "rgb(52, 73, 94)",
                      cursor: "pointer",
                      borderBottom: "2px solid navy",
                    }}
                  >
                    {label}
                  </Anchor>
                  {kurumsalOpen && (
                    <Box ml="md" style={{ marginLeft: 20 }}>
                      {[
                        { label: "Hakkımızda", href: "/About" },
                        { label: "Yönetim Kurulu", href: "/YonetimKurulu" },
                        { label: "Teknokent Yönetimi", href: "/TeknokentYonetim" },
                        { label: "Fiyatlandırma Politikamız", href: "/Fiyatlandırma" },
                        { label: "Haberler", href: "#" },
                        { label: "Etkinlikler", href: "#" },
                       ].map((item) => (
                        <Anchor
                          key={item.label}
                          href={item.href}
                          c="dark"
                          td="none"
                          fw={400}
                          size="md"
                          style={{
                            display: "block",
                            margin: "0.5rem 0",
                            marginLeft: 15,
                          }}
                        >
                          {item.label}
                        </Anchor>
                      ))}
                    </Box>
                  )}
                </Box>
              );
            } else {
              return (
                <Anchor
                  key={label}
                  href={label === "Hakkımızda" ? "/About" : "#"}
                  c="dark"
                  td="none"
                  fw={450}
                  size="lg"
                  style={{
                    display: "block",
                    margin: "1rem",
                    color: "rgb(52, 73, 94)",
                    borderBottom: "2px solid navy",
                  }}
                >
                  {label}
                </Anchor>
              );
            }
          })}
        </Drawer>
      </Box>
    </Box>
  );
}