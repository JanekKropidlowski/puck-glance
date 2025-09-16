import { Article, Document } from "@/types";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Nowy plac zabaw przy ul. Żeromskiego już otwarty",
    excerpt: "Po miesiącach prac remontowych mieszkańcy mogą korzystać z nowoczesnego placu zabaw. Inwestycja kosztowała 120 tysięcy złotych i obejmuje urządzenia dla dzieci w różnym wieku.",
    content: "",
    category: "Inwestycje",
    publishedAt: "2025-01-15T10:00:00Z",
    readTime: 3,
    slug: "nowy-plac-zabaw-zeromskiego",
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: "2", 
    title: "Konsultacje społeczne ws. budowy ścieżki rowerowej",
    excerpt: "Do 31 stycznia mieszkańcy mogą zgłaszać uwagi do projektu nowej ścieżki rowerowej łączącej centrum z dzielnicą mieszkaniową. Planowana długość trasy to 2,5 km.",
    content: "",
    category: "Konsultacje",
    publishedAt: "2025-01-14T14:30:00Z",
    readTime: 2,
    slug: "konsultacje-sciezka-rowerowa"
  },
  {
    id: "3",
    title: "Zmiany w rozkładzie jazdy autobusów komunikacji publicznej",
    excerpt: "Od 20 stycznia wprowadzamy zmiany w rozkładach jazdy linii 12 i 15. Zmiany wynikają z optymalizacji tras i lepszego dostosowania do potrzeb pasażerów.",
    content: "",
    category: "Transport",
    publishedAt: "2025-01-13T12:00:00Z",
    readTime: 4,
    slug: "zmiany-rozklad-autobusy"
  },
  {
    id: "4",
    title: "Sesja Rady Gminy - podsumowanie z 10 stycznia",
    excerpt: "Podczas ostatniej sesji radni podjęli uchwały dotyczące budżetu na 2025 rok oraz przyjęli plan rozwoju infrastruktury sportowej w gminie.",
    content: "",
    category: "Samorząd",
    publishedAt: "2025-01-12T16:45:00Z",
    readTime: 6,
    slug: "sesja-rady-gminy-styczen"
  },
  {
    id: "5",
    title: "Bezpłatne badania profilaktyczne dla seniorów",
    excerpt: "W ramach programu zdrowotnego gminy seniorzy powyżej 65. roku życia mogą skorzystać z bezpłatnych badań podstawowych. Szczegóły w załączonym harmonogramie.",
    content: "",
    category: "Zdrowie",
    publishedAt: "2025-01-11T09:15:00Z",
    readTime: 3,
    slug: "badania-profilaktyczne-seniorzy"
  },
  {
    id: "6",
    title: "Konkurs na najpiękniejszy ogród przydomowy 2025",
    excerpt: "Rozpoczynamy przyjmowanie zgłoszeń do konkursu na najpiękniejszy ogród przydomowy. Nagrody do wygrania, a zwycięzcy zostaną uhonorowani podczas Dnia Gminy.",
    content: "",
    category: "Kultura",
    publishedAt: "2025-01-10T11:20:00Z",
    readTime: 2,
    slug: "konkurs-ogrody-2025"
  },
  {
    id: "7",
    title: "Modernizacja oświetlenia ulicznego - II etap",
    excerpt: "Kontynuujemy wymianę oświetlenia ulicznego na energooszczędne LED. W tym roku planujemy modernizację 150 punktów świetlnych.",
    content: "",
    category: "Inwestycje",
    publishedAt: "2025-01-09T13:30:00Z",
    readTime: 4,
    slug: "modernizacja-oswietlenie-etap-2"
  },
  {
    id: "8",
    title: "Nowe godziny pracy Urzędu Gminy od lutego",
    excerpt: "Od 1 lutego zmieniamy godziny pracy niektórych wydziałów. Wydział Komunikacji będzie czynny także w soboty w godzinach 8:00-12:00.",
    content: "",
    category: "Urząd",
    publishedAt: "2025-01-08T08:00:00Z",
    readTime: 2,
    slug: "nowe-godziny-pracy-urzedu"
  }
];

export const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Uchwała Nr 15/2025 w sprawie budżetu gminy",
    url: "/documents/uchwala-15-2025-budzet.pdf",
    size: "2.3 MB",
    type: "pdf",
    publishedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2", 
    name: "Harmonogram badań profilaktycznych dla seniorów",
    url: "/documents/harmonogram-badania-seniorzy.pdf",
    size: "890 KB",
    type: "pdf",
    publishedAt: "2025-01-14T14:30:00Z"
  },
  {
    id: "3",
    name: "Projekt ścieżki rowerowej - mapa trasy",
    url: "/documents/sciezka-rowerowa-mapa.jpg",
    size: "1.2 MB", 
    type: "jpg",
    publishedAt: "2025-01-13T12:00:00Z"
  },
  {
    id: "4",
    name: "Protokół z sesji Rady Gminy z 10.01.2025",
    url: "/documents/protokol-sesja-10-01-2025.docx",
    size: "450 KB",
    type: "docx", 
    publishedAt: "2025-01-12T16:45:00Z"
  },
  {
    id: "5",
    name: "Regulamin konkursu ogrodniczego 2025",
    url: "/documents/regulamin-konkurs-ogrody-2025.pdf",
    size: "1.1 MB",
    type: "pdf",
    publishedAt: "2025-01-11T09:15:00Z"
  }
];