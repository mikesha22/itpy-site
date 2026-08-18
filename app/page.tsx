import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "ITPY — информатика, которую понимаешь",
  description:
    "Онлайн-подготовка к ЕГЭ и ОГЭ по информатике с понятной теорией, практикой и поддержкой преподавателя.",
};

export default function Home() {
  return <HomeClient />;
}
