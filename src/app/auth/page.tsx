import { LoginForm } from "@/components/forms/login";
import { PageDescription, PageTitle } from "@/components/page-title";
import Image from "next/image";
import MoveIcon from "../../../public/move-icon.svg";

export default async function ServerPage() {
  return (
    <div>
      <Image src={MoveIcon} alt="Move Icon" className="size-7" />
      <PageTitle className="mt-8">Willkommen zurück!</PageTitle>
      <PageDescription className="mt-2">
        Bitte melde dich mit deinem Microsoft Konto an, um fortzufahren.
      </PageDescription>
      <LoginForm className="mt-8" />
    </div>
  );
}
