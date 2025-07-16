import { Metadata } from "next";

import { MainPage } from "@/components/main/MainPage";

export const metadata: Metadata = {
  title: "Reablocks - Open Source ReactJS Component Library",
  description:
    "50+ Components for ReactJS based on Tailwind CSS and Framer Motion",
};

export default function Home() {
  return <MainPage />;
}
