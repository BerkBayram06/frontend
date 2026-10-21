import type { CampusEvent } from "../types/campus-event";

export const initialEvents: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Siber Güvenlik ve Ağ Savunması",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-10-27",
    time: "15:00",
    location: "B Blok Amfi 1",
    description: "Güncel siber tehditler ve beyaz şapkalı hackerlık üzerine söyleşi."
  }
];