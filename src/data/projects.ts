import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "vendis",
    title: "Vendis – IoT Payment Controller",
    description: "Static QR payment controller\nfor vending machines with\nESP32 and remote connectivity.",
    image: "/images/vendis-controller.webp",
    imageAlt: "Reference illustration of a black payment controller with a small QR display",
    category: "IoT · Embedded Systems",
    overview: "Vendis brings a static QR payment interface and remote connectivity to vending machines. The project combines an ESP32-based controller with embedded software for the machine's payment workflow.",
    scope: ["ESP32-based payment controller", "Static QR payment interface", "Embedded firmware and machine integration", "Remote connectivity"],
  },
  {
    slug: "vendops",
    title: "VendOps – Fleet Operations Platform",
    description: "SaaS platform for machine\nmonitoring, transactions\nand operations management.",
    image: "/images/vendops-dashboard.webp",
    imageAlt: "Reference illustration of a laptop displaying a fleet operations dashboard",
    category: "SaaS · Cloud Software",
    overview: "VendOps brings machine monitoring, transactions, and day-to-day fleet operations into a software platform. It connects the information from machines with the workflows needed to manage them.",
    scope: ["Machine monitoring", "Transaction visibility", "Fleet operations management", "Device and cloud integration"],
  },
  {
    slug: "custom-iot",
    title: "Custom IoT Solutions",
    description: "End-to-end hardware and\nsoftware development for\nvarious industrial and\ncommercial applications.",
    image: "/images/custom-iot-pcb.webp",
    imageAlt: "Reference illustration of a green printed circuit board with electronic components",
    category: "Hardware · Software · Integration",
    overview: "Custom IoT development connects electronics, embedded software, and cloud applications around the needs of a particular use case. Voltnite's work spans the hardware and software needed for industrial and commercial applications.",
    scope: ["Electronics and PCB development", "Embedded software", "Connected device integration", "Cloud application development"],
  },
];
