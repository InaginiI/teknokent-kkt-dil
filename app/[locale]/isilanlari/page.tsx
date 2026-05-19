"use client"

import {
  Container,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  TextInput,
  Select,
  MultiSelect,
  Pagination,
  Center,
  Divider,
  Box,
  rem,
  Transition,
  Paper,
  Modal,
  Textarea,
  SimpleGrid,
  Anchor,
  Avatar,
  Loader,
  Alert,
  Title,
  ActionIcon,
} from "@mantine/core"
import { 
  IconSearch, 
  IconBriefcase, 
  IconCalendar, 
  IconMapPin, 
  IconPlus,
  IconX,
  IconEdit,
  IconTrash,
  IconLogin,
  IconUserPlus,
  IconInfoCircle
} from "@tabler/icons-react"
import { useState, useEffect, useCallback } from "react"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"

interface JobListing {
  id: number
  title: string
  company: string
  type: "full-time" | "part-time" | "internship" | "contract"
  category: string
  location: string
  datePosted: string
  description: string
  tags: string[]
  companyLogo?: string
}

const jobCategories = [
  "Yazılım Geliştirme",
  "Elektronik Mühendisliği",
  "Tasarım",
  "Üretim",
  "Satış & Pazarlama",
  "Finans",
  "İnsan Kaynakları",
  "AR-GE",
]

const typeLabels = {
  "full-time": "Tam Zamanlı",
  "part-time": "Yarı Zamanlı",
  internship: "Staj",
  contract: "Sözleşmeli",
}

const typeColors = {
  "full-time": "blue",
  "part-time": "green",
  internship: "teal",
  contract: "orange",
}

// Simüle edilmiş API fonksiyonları
const fetchJobs = async (): Promise<JobListing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedJobs = localStorage.getItem("jobListings")
      if (savedJobs) {
        resolve(JSON.parse(savedJobs))
      } else {
        resolve(initialJobListings)
      }
    }, 800)
  })
}

const saveJobs = async (jobs: JobListing[]): Promise<void> => {
  localStorage.setItem("jobListings", JSON.stringify(jobs))
}

const initialJobListings: JobListing[] = [
  {
    id: 1,
    title: "Frontend Geliştirici",
    company: "Teknoloji Dev A.Ş.",
    type: "full-time",
    category: "Yazılım Geliştirme",
    location: "İstanbul, Türkiye",
    datePosted: "2023-10-15",
    description: "React ve TypeScript kullanarak modern web uygulamaları geliştirecek yetenekli bir frontend geliştirici arıyoruz. 3+ yıl deneyim ve güçlü CSS bilgisi gereklidir.",
    tags: ["React", "TypeScript", "CSS", "Redux"],
    companyLogo: "",
  },
  {
    id: 2,
    title: "Backend Mühendisi",
    company: "Veri Çözümleri Ltd.",
    type: "full-time",
    category: "Yazılım Geliştirme",
    location: "Ankara, Türkiye",
    datePosted: "2023-10-10",
    description: "Node.js ve Express.js kullanarak ölçeklenebilir backend sistemleri geliştirecek deneyimli mühendisler arıyoruz. MongoDB ve PostgreSQL deneyimi artıdır.",
    tags: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    id: 3,
    title: "UX/UI Tasarımcı",
    company: "Dijital Ajans X",
    type: "contract",
    category: "Tasarım",
    location: "İzmir, Türkiye",
    datePosted: "2023-10-05",
    description: "Kullanıcı deneyimi odaklı tasarımlar oluşturacak yaratıcı bir tasarımcı arıyoruz. Figma ve Adobe XD kullanımında yetkinlik gereklidir.",
    tags: ["Figma", "UI Design", "UX Research", "Prototyping"],
  },
  {
    id: 4,
    title: "DevOps Mühendisi",
    company: "Bulut Sistemleri A.Ş.",
    type: "full-time",
    category: "Yazılım Geliştirme",
    location: "Remote",
    datePosted: "2023-10-01",
    description: "CI/CD pipeline'ları oluşturup yönetecek, bulut altyapılarında deneyimli DevOps mühendisi arıyoruz. AWS ve Docker bilgisi şarttır.",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 5,
    title: "Satış Temsilcisi",
    company: "Pazarlama Gurusu",
    type: "part-time",
    category: "Satış & Pazarlama",
    location: "İstanbul, Türkiye",
    datePosted: "2023-09-28",
    description: "B2B satış deneyimi olan, iletişim becerileri güçlü satış temsilcileri arıyoruz. Esnek çalışma saatleri ve yüksek komisyon imkanı.",
    tags: ["Satış", "Pazarlama", "B2B", "Müşteri İlişkileri"],
  },
  {
    id: 6,
    title: "Veri Bilimci",
    company: "Yapay Zeka Çözümleri",
    type: "full-time",
    category: "AR-GE",
    location: "İstanbul, Türkiye",
    datePosted: "2023-09-25",
    description: "Makine öğrenmesi modelleri geliştirecek, veri analizi ve istatistik alanında uzman veri bilimciler arıyoruz. Python ve SQL bilgisi şarttır.",
    tags: ["Python", "Machine Learning", "SQL", "Data Analysis"],
  },
  {
    id: 7,
    title: "Stajyer Yazılım Geliştirici",
    company: "Startup Teknoloji",
    type: "internship",
    category: "Yazılım Geliştirme",
    location: "Remote",
    datePosted: "2023-09-20",
    description: "Web ve mobil uygulama geliştirme süreçlerinde yer alacak stajyerler arıyoruz. Öğrenme isteği ve temel programlama bilgisi yeterlidir.",
    tags: ["JavaScript", "React Native", "Staj", "Öğrenme"],
  },
  {
    id: 8,
    title: "Ürün Yöneticisi",
    company: "Dijital Ürünler Ltd.",
    type: "full-time",
    category: "Yazılım Geliştirme",
    location: "Ankara, Türkiye",
    datePosted: "2023-09-15",
    description: "Yazılım ürünlerinin yaşam döngüsünü yönetecek, teknik ve iş birimleri arasında köprü olacak ürün yöneticisi arıyoruz. 5+ yıl deneyim gereklidir.",
    tags: ["Ürün Yönetimi", "Agile", "Scrum", "KPI"],
  },
]

export default function JobListings() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activePage, setActivePage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [adminOpened, { open: openAdmin, close: closeAdmin }] = useDisclosure(false)
  const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false)
  const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false)
  const [registerOpened, { open: openRegister, close: closeRegister }] = useDisclosure(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [newJob, setNewJob] = useState<Omit<JobListing, "id">>({
    title: "",
    company: "",
    type: "full-time",
    category: "",
    location: "",
    datePosted: new Date().toISOString().split("T")[0],
    description: "",
    tags: [],
    companyLogo: "",
  })
  
  const [tempTag, setTempTag] = useState("")
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })
  
  const [registerForm, setRegisterForm] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  
  const itemsPerPage = 6

  useEffect(() => {
    setMounted(true)
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await fetchJobs()
      setJobs(data)
      setFilteredJobs(data)
      setError(null)
    } catch (err) {
      setError("İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let results = [...jobs]

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedType) results = results.filter((job) => job.type === selectedType)
    if (selectedCategories.length > 0)
      results = results.filter((job) => selectedCategories.includes(job.category))

    setFilteredJobs(results)
    setActivePage(1)
  }, [searchTerm, selectedType, selectedCategories, jobs])

  const paginatedJobs = filteredJobs.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

  const typeOptions = [
    { value: "full-time", label: "Tam Zamanlı" },
    { value: "part-time", label: "Yarı Zamanlı" },
    { value: "internship", label: "Staj" },
    { value: "contract", label: "Sözleşmeli" },
  ]

  const handleAddJob = async () => {
    if (
      !newJob.title || 
      !newJob.company || 
      !newJob.category || 
      !newJob.location || 
      !newJob.description
    ) {
      notifications.show({
        title: "Eksik Bilgi",
        message: "Lütfen tüm gerekli alanları doldurun",
        color: "red",
        icon: <IconX />,
      })
      return
    }

    const jobToAdd: JobListing = {
      ...newJob,
      id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
    }

    const updatedJobs = [...jobs, jobToAdd]
    setJobs(updatedJobs)
    await saveJobs(updatedJobs)
    
    notifications.show({
      title: "İlan Eklendi",
      message: `${jobToAdd.title} ilanı başarıyla yayınlandı`,
      color: "teal",
      icon: <IconBriefcase />,
    })
    
    setNewJob({
      title: "",
      company: "",
      type: "full-time",
      category: "",
      location: "",
      datePosted: new Date().toISOString().split("T")[0],
      description: "",
      tags: [],
      companyLogo: "",
    })
    closeAdmin()
  }

  const handleDeleteJob = async (id: number) => {
    const updatedJobs = jobs.filter(job => job.id !== id)
    setJobs(updatedJobs)
    await saveJobs(updatedJobs)
    
    notifications.show({
      title: "İlan Silindi",
      message: "İlan başarıyla kaldırıldı",
      color: "green",
      icon: <IconTrash />,
    })
  }

  const handleLogin = () => {
    // Basit giriş simülasyonu
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true)
      setIsAdmin(true)
      closeLogin()
      
      notifications.show({
        title: "Giriş Başarılı",
        message: "Admin paneline yönlendiriliyorsunuz",
        color: "teal",
        icon: <IconLogin />,
      })
    } else {
      notifications.show({
        title: "Giriş Hatası",
        message: "Lütfen email ve şifrenizi girin",
        color: "red",
        icon: <IconX />,
      })
    }
  }

  const handleRegister = () => {
    if (!registerForm.companyName || !registerForm.email || !registerForm.password) {
      notifications.show({
        title: "Eksik Bilgi",
        message: "Lütfen tüm alanları doldurun",
        color: "red",
        icon: <IconX />,
      })
      return
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      notifications.show({
        title: "Şifre Uyuşmazlığı",
        message: "Girdiğiniz şifreler eşleşmiyor",
        color: "red",
        icon: <IconX />,
      })
      return
    }
    
    notifications.show({
      title: "Kayıt Başarılı",
      message: `${registerForm.companyName} şirketi olarak kaydınız tamamlandı`,
      color: "teal",
      icon: <IconUserPlus />,
    })
    
    setRegisterForm({
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    closeRegister()
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    
    notifications.show({
      title: "Çıkış Yapıldı",
      message: "Güvenliğiniz için oturumunuz kapatıldı",
      color: "blue",
      icon: <IconLogin />,
    })
  }

  const addTag = () => {
    if (tempTag.trim() && !newJob.tags.includes(tempTag.trim())) {
      setNewJob({
        ...newJob,
        tags: [...newJob.tags, tempTag.trim()],
      })
      setTempTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewJob({
      ...newJob,
      tags: newJob.tags.filter(tag => tag !== tagToRemove),
    })
  }

  const handleApply = (jobId: number) => {
    notifications.show({
      title: "Başvuru Gönderildi",
      message: "Başvurunuz şirkete iletildi. Size dönüş yapılacaktır.",
      color: "green",
      icon: <IconBriefcase />,
    })
  }

  const openJobDetail = (job: JobListing) => {
    setSelectedJob(job)
    openDetail()
  }

  const noJobsAvailable = jobs.length === 0
  const noFilterResults = filteredJobs.length === 0 && !noJobsAvailable

  return (
    <Container size="xl" py="xl">
      {/* Başlık Bölümü */}
      <Box
        mb="xl"
        p="xl"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: rem(16),
          color: "white",
        }}
      >
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={700} mb="md">
              Bir Sonraki Fırsatını Keşfet
            </Text>
            <Text opacity={0.9}>
              En iyi şirketlerden iş ve staj ilanlarını bul
            </Text>
          </div>
          
          {isLoggedIn ? (
            <Group>
              <Button 
                variant="white" 
                color="dark"
                leftSection={<IconBriefcase size={18} />}
                onClick={openAdmin}
                radius="md"
              >
                İlan Yönetimi
              </Button>
              <Button 
                variant="white" 
                color="dark"
                leftSection={<IconX size={18} />}
                onClick={handleLogout}
                radius="md"
              >
                Çıkış Yap
              </Button>
            </Group>
          ) : (
            <Group>
              <Button 
                variant="white" 
                color="dark"
                leftSection={<IconLogin size={18} />}
                onClick={openLogin}
                radius="md"
              >
                Şirket Girişi
              </Button>
              <Button 
                variant="white" 
                color="dark"
                leftSection={<IconUserPlus size={18} />}
                onClick={openRegister}
                radius="md"
              >
                Şirket Kaydı
              </Button>
            </Group>
          )}
        </Group>
      </Box>

      {/* Filtreleme Bölümü */}
      <Paper
        withBorder
        shadow="lg"
        radius="lg"
        mb="xl"
        p="lg"
        style={{ background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)" }}
      >
        <Grid gutter="md">
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <TextInput
              leftSection={<IconSearch size={18} />}
              placeholder="İş, şirket veya teknoloji ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              size="md"
              radius="md"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "#667eea",
                    boxShadow: "0 0 0 2px rgba(102, 126, 234, 0.2)",
                  },
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={{ xs: 12, md: 3 }}>
            <Select
              leftSection={<IconBriefcase size={18} />}
              placeholder="İş Tipi"
              data={typeOptions}
              value={selectedType}
              onChange={setSelectedType}
              clearable
              size="md"
              radius="md"
            />
          </Grid.Col>

          <Grid.Col span={{ xs: 12, md: 3 }}>
            <MultiSelect
              leftSection={<IconCalendar size={18} />}
              placeholder="Kategoriler"
              data={jobCategories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              clearable
              hidePickedOptions
              size="md"
              radius="md"
            />
          </Grid.Col>
        </Grid>

        <Group justify="space-between" mt="lg">
          <Text size="sm" c="dimmed" fw={500}>
            {filteredJobs.length} ilan bulundu
          </Text>
          
          <Group>
            {isAdmin && (
              <Button
                variant="light"
                leftSection={<IconPlus size={18} />}
                onClick={openAdmin}
                radius="md"
              >
                Yeni İlan Ekle
              </Button>
            )}
            
            <Button
              variant="light"
              onClick={() => {
                setSearchTerm("")
                setSelectedType(null)
                setSelectedCategories([])
              }}
              radius="md"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
              }}
            >
              Filtreleri Temizle
            </Button>
          </Group>
        </Group>
      </Paper>

      {/* Yükleme ve Hata Durumları */}
      {loading && (
        <Center py="xl">
          <Loader size="lg" />
          <Text ml="md">İlanlar yükleniyor...</Text>
        </Center>
      )}
      
      {error && (
        <Alert variant="light" color="red" title="Hata" icon={<IconInfoCircle />} mb="xl">
          {error}
        </Alert>
      )}

      {/* İlanların Listesi */}
      {!loading && !error && (
        <>
          {noJobsAvailable ? (
            <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center">
              <Title order={3} c="dimmed" mb="md">
                Henüz hiç ilan yok
              </Title>
              <Text mb="xl">Şu anda aktif ilan bulunmamaktadır</Text>
              
              {isAdmin ? (
                <Button 
                  onClick={openAdmin}
                  leftSection={<IconPlus size={18} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'violet' }}
                >
                  İlk İlanını Ekle
                </Button>
              ) : (
                <Text>
                  Şirketler ilan eklediğinde burada görünecektir.{" "}
                  <Anchor onClick={openLogin} fw={500}>
                    Şirket hesabınızla giriş yaparak ilan verebilirsiniz
                  </Anchor>
                </Text>
              )}
            </Paper>
          ) : noFilterResults ? (
            <Paper withBorder shadow="sm" radius="lg" p="xl" ta="center">
              <Title order={3} c="dimmed" mb="md">
                Arama sonucu bulunamadı
              </Title>
              <Text mb="xl">Filtrelerinizi genişleterek tekrar deneyin</Text>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType(null)
                  setSelectedCategories([])
                }}
                variant="gradient"
                gradient={{ from: 'blue', to: 'violet' }}
              >
                Filtreleri Temizle
              </Button>
            </Paper>
          ) : (
            <Grid gutter="xl">
              {paginatedJobs.map((job, index) => (
                <Grid.Col key={job.id} span={{ xs: 12, md: 6, lg: 4 }}>
                  <Transition
                    mounted={mounted}
                    transition="slide-up"
                    duration={300}
                    timingFunction="ease"
                    exitDuration={200}
                  >
                    {(styles) => (
                      <Card
                        withBorder
                        shadow="md"
                        radius="lg"
                        h="100%"
                        style={{
                          ...styles,
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          transformOrigin: "center",
                          animationDelay: `${index * 100}ms`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"
                          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)"
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                        }}
                        onClick={() => openJobDetail(job)}
                      >
                        <Group align="flex-start" mb="sm">
                          {job.companyLogo ? (
                            <Avatar src={job.companyLogo} size="lg" radius="sm" />
                          ) : (
                            <Avatar color="blue" size="lg" radius="sm">
                              {job.company.charAt(0)}
                            </Avatar>
                          )}
                          
                          <div style={{ flex: 1 }}>
                            <Text fw={700} size="lg" lineClamp={2}>
                              {job.title}
                            </Text>
                            <Text size="md" c="blue" fw={600} mt={4}>
                              {job.company}
                            </Text>
                          </div>
                          
                          <Badge color={typeColors[job.type]} variant="light" size="md" radius="md">
                            {typeLabels[job.type]}
                          </Badge>
                          
                          {isAdmin && (
                            <ActionIcon 
                              color="red" 
                              variant="light"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteJob(job.id)
                              }}
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
                          )}
                        </Group>

                        <Group mt="sm" c="dimmed" gap="lg">
                          <Group gap={6}>
                            <IconMapPin size={16} />
                            <Text size="sm">{job.location}</Text>
                          </Group>
                          <Group gap={6}>
                            <IconCalendar size={16} />
                            <Text size="sm">{new Date(job.datePosted).toLocaleDateString()}</Text>
                          </Group>
                        </Group>

                        <Text mt="md" lineClamp={3} c="dimmed">
                          {job.description}
                        </Text>

                        <Group mt="md" gap="xs">
                          {job.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="dot" color="gray" size="sm">
                              {tag}
                            </Badge>
                          ))}
                          {job.tags.length > 3 && (
                            <Badge variant="light" color="gray" size="sm">
                              +{job.tags.length - 3}
                            </Badge>
                          )}
                        </Group>

                        <Group mt="xl" justify="space-between">
                          <Button 
                            variant="light" 
                            radius="md" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              openJobDetail(job)
                            }}
                          >
                            Detaylı Bilgi
                          </Button>
                          <Button
                            radius="md"
                            size="sm"
                            style={{
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              border: "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleApply(job.id)
                            }}
                          >
                            Başvur
                          </Button>
                        </Group>
                      </Card>
                    )}
                  </Transition>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {filteredJobs.length > itemsPerPage && !noFilterResults && !noJobsAvailable && (
            <Box mt="xl">
              <Divider mb="md" />
              <Center mt="xl">
                <Pagination
                  total={Math.ceil(filteredJobs.length / itemsPerPage)}
                  value={activePage}
                  onChange={(page) => {
                    setActivePage(page)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  size="md"
                  radius="md"
                  styles={{
                    control: {
                      '&[data-active="true"]': {
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        color: "white",
                      },
                    },
                  }}
                />
              </Center>
            </Box>
          )}
        </>
      )}

      {/* Şirketler için CTA */}
      <Paper
        withBorder
        shadow="lg"
        radius="lg"
        mt="xl"
        p="xl"
        style={{ background: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)" }}
      >
        <Text size="xl" fw={700} mb="md" ta="center">
          İlan Yayınlamaya Hazır mısınız?
        </Text>
        <Text c="dimmed" ta="center" mb="xl" size="lg">
          En iyi yeteneklerle buluşun ve ekibinizi büyütün
        </Text>

        <Grid>
          <Grid.Col span={{ xs: 12, md: 6 }}>
            <Box
              p="xl"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                borderRadius: rem(12),
                color: "white",
              }}
            >
              <Text fw={700} mb="sm" size="lg">
                Firmalar İçin
              </Text>
              <Text mb="md" opacity={0.9}>
                İş ilanlarınızı yayınlayın ve ekibiniz için doğru adayları bulun.
              </Text>
              <Button 
                fullWidth 
                variant="white" 
                color="blue" 
                radius="md" 
                size="md"
                onClick={openLogin}
              >
                Firma Girişi
              </Button>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ xs: 12, md: 6 }}>
            <Box
              p="xl"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: rem(12),
                color: "white",
              }}
            >
              <Text fw={700} mb="sm" size="lg">
                Yeni Firma
              </Text>
              <Text mb="md" opacity={0.9}>
                Platformumuza katılın ve ilan yayınlayarak yetkin adaylara ulaşın.
              </Text>
              <Button 
                fullWidth 
                variant="white" 
                color="teal" 
                radius="md" 
                size="md"
                onClick={openRegister}
              >
                Hesap Oluştur
              </Button>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* İlan Detay Modalı */}
      <Modal 
        opened={detailOpened} 
        onClose={closeDetail}
        title={<Text fw={700}>{selectedJob?.title}</Text>}
        size="lg"
        centered
      >
        {selectedJob && (
          <div>
            <Group mb="md" align="flex-start">
              {selectedJob.companyLogo ? (
                <Avatar src={selectedJob.companyLogo} size="lg" radius="sm" />
              ) : (
                <Avatar color="blue" size="lg" radius="sm">
                  {selectedJob.company.charAt(0)}
                </Avatar>
              )}
              
              <div>
                <Text size="xl" fw={600} c="blue">
                  {selectedJob.company}
                </Text>
                <Group mt={4} gap="xs">
                  <Badge color={typeColors[selectedJob.type]} variant="light" size="md">
                    {typeLabels[selectedJob.type]}
                  </Badge>
                  <Badge color="gray" variant="light" size="md">
                    {selectedJob.category}
                  </Badge>
                </Group>
              </div>
            </Group>
            
            <Divider my="md" />
            
            <SimpleGrid cols={2} spacing="md" mb="lg">
              <Group gap={6}>
                <IconMapPin size={20} />
                <Text fw={500}>{selectedJob.location}</Text>
              </Group>
              
              <Group gap={6}>
                <IconCalendar size={20} />
                <Text fw={500}>
                  {new Date(selectedJob.datePosted).toLocaleDateString()}
                </Text>
              </Group>
            </SimpleGrid>
            
            <Text fw={600} mb="sm">İş Tanımı:</Text>
            <Text mb="lg" style={{ whiteSpace: "pre-line" }}>
              {selectedJob.description}
            </Text>
            
            <Text fw={600} mb="sm">Gereksinimler:</Text>
            <Group gap="xs" mb="lg">
              {selectedJob.tags.map((tag) => (
                <Badge key={tag} variant="light" color="blue" size="sm">
                  {tag}
                </Badge>
              ))}
            </Group>
            
            <Center mt="xl">
              <Button
                size="lg"
                radius="md"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
                onClick={() => {
                  handleApply(selectedJob.id)
                  closeDetail()
                }}
                fullWidth
              >
                Bu İlana Başvur
              </Button>
            </Center>
          </div>
        )}
      </Modal>

      {/* Admin Paneli Modal */}
      <Modal 
        opened={adminOpened} 
        onClose={closeAdmin}
        title={<Text fw={700}>Yeni İş İlanı Ekle</Text>}
        size="lg"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label="İlan Başlığı"
            placeholder="Örn: Frontend Geliştirici"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.currentTarget.value })}
            required
          />
          
          <TextInput
            label="Şirket Adı"
            placeholder="Şirketinizin adı"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.currentTarget.value })}
            required
          />
          
          <TextInput
            label="Şirket Logosu URL (Opsiyonel)"
            placeholder="https://..."
            value={newJob.companyLogo || ""}
            onChange={(e) => setNewJob({ ...newJob, companyLogo: e.currentTarget.value })}
          />
          
          <Select
            label="İş Tipi"
            data={typeOptions}
            value={newJob.type}
            onChange={(value) => setNewJob({ ...newJob, type: value as any })}
            required
          />
          
          <Select
            label="Kategori"
            data={jobCategories}
            value={newJob.category}
            onChange={(value) => setNewJob({ ...newJob, category: value || "" })}
            required
          />
          
          <TextInput
            label="Lokasyon"
            placeholder="Örn: İstanbul, Türkiye"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.currentTarget.value })}
            required
          />
        </SimpleGrid>
        
        <Textarea
          label="İş Tanımı"
          placeholder="İşin detaylarını açıklayın..."
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.currentTarget.value })}
          mt="md"
          minRows={4}
          required
        />
        
        <Box mt="md">
          <Text size="sm" fw={500} mb={4}>
            Etiketler
          </Text>
          
          <Group gap={4} mb="sm">
            {newJob.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="light" 
                rightSection={
                  <ActionIcon 
                    size="xs" 
                    color="gray" 
                    onClick={() => removeTag(tag)}
                  >
                    <IconX size={12} />
                  </ActionIcon>
                }
              >
                {tag}
              </Badge>
            ))}
          </Group>
          
          <Group>
            <TextInput
              placeholder="Yeni etiket ekle"
              value={tempTag}
              onChange={(e) => setTempTag(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
            />
            <Button variant="outline" onClick={addTag}>
              Ekle
            </Button>
          </Group>
        </Box>
        
        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={closeAdmin}>
            İptal
          </Button>
          <Button 
            onClick={handleAddJob}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            İlanı Yayınla
          </Button>
        </Group>
      </Modal>

      {/* Giriş Modalı */}
      <Modal 
        opened={loginOpened} 
        onClose={closeLogin}
        title={<Text fw={700}>Şirket Girişi</Text>}
        size="md"
      >
        <TextInput
          label="E-posta"
          placeholder="sirket@ornek.com"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <TextInput
          label="Şifre"
          type="password"
          placeholder="••••••••"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <Group justify="space-between" mt="xl">
          <Anchor 
            onClick={() => notifications.show({
              title: "Şifremi Unuttum",
              message: "Şifre sıfırlama linki e-posta adresinize gönderildi",
            })}
          >
            Şifremi unuttum
          </Anchor>
          
          <Button 
            onClick={handleLogin}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            Giriş Yap
          </Button>
        </Group>
      </Modal>

      {/* Kayıt Modalı */}
      <Modal 
        opened={registerOpened} 
        onClose={closeRegister}
        title={<Text fw={700}>Şirket Kaydı</Text>}
        size="md"
      >
        <TextInput
          label="Şirket Adı"
          placeholder="Şirketinizin adı"
          value={registerForm.companyName}
          onChange={(e) => setRegisterForm({ ...registerForm, companyName: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <TextInput
          label="E-posta"
          placeholder="sirket@ornek.com"
          value={registerForm.email}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <TextInput
          label="Şifre"
          type="password"
          placeholder="••••••••"
          value={registerForm.password}
          onChange={(e) => setRegisterForm({ ...registerForm, password: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <TextInput
          label="Şifre Tekrar"
          type="password"
          placeholder="••••••••"
          value={registerForm.confirmPassword}
          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.currentTarget.value })}
          required
          mt="md"
        />
        
        <Button 
          onClick={handleRegister}
          fullWidth
          mt="xl"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            border: "none",
          }}
        >
          Kayıt Ol
        </Button>
      </Modal>
    </Container>
  )
}