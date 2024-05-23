import Database from "@/components/Dashboard/Database";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
    title: "DualSec | Your Solution to Data Protection",
    description: "DualSec App",
};

export default function overview() {
  return (
    <>
      <DefaultLayout>
        <Database />
      </DefaultLayout>
    </>
  );
}
