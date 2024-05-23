import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Learning from "@/components/Dashboard/Learning";

export const metadata: Metadata = {
    title: "DualSec | Your Solution to Data Protection",
    description: "DualSec App",
};

export default function overview() {
  return (
    <>
      <DefaultLayout>
        <Learning />
      </DefaultLayout>
    </>
  );
}
