import ChristmasCardGenerator from "@/components/ChristmasCardGenerator";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function SharedCardPage() {
    const cookieStore =await cookies();
    const userData = cookieStore.get("userData")?.value || null;
    const userDataObj = userData ? JSON.parse(userData) : null;
  
    if (!userDataObj) {
      notFound();
    }
  

    return (
      <div className="min-h-screen py-8 px-4 font-[family-name:var(--font-geist-sans)]">
        <div className="max-w-4xl mx-auto">
          <ChristmasCardGenerator userData={userDataObj} />
        </div>
      </div>
    );
  }