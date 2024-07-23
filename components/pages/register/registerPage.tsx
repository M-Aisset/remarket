"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { MoveRight } from "lucide-react";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const algWilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naama",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "d'In Salah",
    "d'In Guezzam",
    "Touggourt",
    "Djanet",
    "d'El M'Ghair",
    "d'El Meniaa",
  ];
  const router = useRouter();
  async function actionHandler(formData: FormData) {
    const data = await register(formData);
    if (data.success) {
      console.log(data.message);
      router.push(
        searchParams.from !== undefined && searchParams.from !== "" ? (searchParams.from as string) : "/"
      );
    } else {
      console.log(data.message);
    }
  }
  return (
    <div className="py-8">
      <div className="px-2">
        <h1 className="text-center font-semibold text-[2.5rem]">Create a new account</h1>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="text-primary hover:text-primary/80"
            href={`/signin?from=${
              searchParams.from !== undefined && searchParams.from !== ""
                ? encodeURIComponent(searchParams.from as string)
                : "/"
            }`}
          >
            Sign in
          </Link>
        </p>
      </div>
      <form action={actionHandler}>
        <div className="flex justify-center items-center w-full">
          <div
            className={`mt-6 w-full lg:px-48 px-8 grid
            grid-cols-1 sm:grid-cols-2 gap-4 gap-x-12`}
          >
            <div>
              <Label htmlFor="fullName" className="text-base">
                Full name :
              </Label>
              <Input id="fullName" name="fullName" placeholder="Full name" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="userName" className="text-base">
                User name :
              </Label>
              <Input placeholder="User name" id="userName" name="userName" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="email" className="text-base">
                Email :
              </Label>
              <Input placeholder="Email" id="email" name="email" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-base">
                Phone :
              </Label>
              <Input placeholder="Phone" id="phone" name="phone" className="mt-2 w-full" />
            </div>
            <div>
              <Label htmlFor="wilaya" className="text-base">
                Wilaya :
              </Label>
              <select
                defaultValue=""
                id="wilaya"
                name="wilaya"
                className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Wilaya</option>
                {algWilayas.map((wilaya, idx) => {
                  return (
                    <option key={idx} value={wilaya}>
                      {idx + 1 + "-" + wilaya}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <Label htmlFor="password" className="text-base">
                Password :
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="mt-2 w-full"
              />
            </div>
            <div>
              <Label htmlFor="repeatPassword" className="text-base">
                Repeat password :
              </Label>
              <Input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat password"
                className="mt-2 w-full"
              />
            </div>
            <div>
              <Label htmlFor="verificationCode" className="text-base">
                Verification code :
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Verification code"
                  id="verificationCode"
                  name="verificationCode"
                  className="mt-2 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button type="button" variant="link" className="absolute right-0 top-0 py-0 hover:no-underline">
                  Send code
                  <MoveRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center lg:px-48 px-8 mt-12 gap-8 ">
          <Link
            href={
              searchParams.from !== undefined && searchParams.from !== "" ? (searchParams.from as string) : "/"
            }
          >
            <Button type="button" variant="outline" className="w-32">
              Cancel
            </Button>
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={`w-32`} disabled={pending}>
      Sign up
    </Button>
  );
}
