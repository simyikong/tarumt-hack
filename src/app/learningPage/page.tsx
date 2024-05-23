import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LearningPage from "@/components/Dashboard/LearningPage";

export const metadata: Metadata = {
    title: "DualSec | Your Solution to Data Protection",
    description: "DualSec App",
};

export default function overview() {
  return (
    <>
      <DefaultLayout>
        <LearningPage />
      </DefaultLayout>
    </>
  );
}
