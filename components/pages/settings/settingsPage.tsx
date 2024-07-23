"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import sharp from "sharp";
import { updateUser } from "@/actions/updateUser";
import { useFormStatus } from "react-dom";

export default function SettingsPage({
  user,
}: {
  user: {
    fullName: string;
    userName: string;
    profileImageUrl: string;
    wilaya: string;
    email: string;
    phone: string;
  };
}) {
  const router = useRouter();
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

  const [profileImage, setProfileImage] = useState<{ url: string; file: File } | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage({ url: URL.createObjectURL(file), file: file });
    }
  }

  async function actionHandler(formData: FormData) {
    formData.append("profileImage", profileImage ? profileImage.file : "");
    const data = await updateUser(formData);
    if (data.success) {
      console.log(data.message);
      router.refresh();
    } else {
      console.log(data.message);
    }
  }

  return (
    <div className="pb-11 py-6 md:px-24 px-8">
      <form action={actionHandler}>
        <div className="border-b pb-5 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-muted-foreground text-sm">Manage your account settings.</p>
          </div>
          <SubmitButton />
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Information</h2>
          <p className="text-muted-foreground text-sm">Update your account information.</p>
        </div>
        <div className="mt-4">
          <Label htmlFor="profilImage" className="text-right text-base">
            Profile image :
          </Label>
          <div className="flex items-end">
            <Avatar className="mt-2 size-20 border">
              <AvatarImage src={profileImage ? profileImage.url : user.profileImageUrl} />
              <AvatarFallback>{Array.from(user.userName)[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input
              id="profilImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="ml-4 w-auto"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-base">
              Full name :
            </Label>
            <Input
              defaultValue={user.fullName}
              id="fullName"
              name="fullName"
              placeholder="Full name"
              className="mt-2 w-full"
            />
          </div>
          <div>
            <Label htmlFor="userName" className="text-base">
              User name :
            </Label>
            <Input
              defaultValue={user.userName}
              placeholder="User name"
              id="userName"
              name="userName"
              className="mt-2 w-full"
            />
          </div>
          <div>
            <Label htmlFor="wilaya" className="text-base">
              Wilaya :
            </Label>
            <select
              defaultValue={user.wilaya}
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
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="text-muted-foreground text-sm">Update your security information.</p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-base">
              Email :
            </Label>
            <Input defaultValue={user.email} id="email" name="email" placeholder="Email" className="mt-2 w-full" />
          </div>
          <div>
            <Label htmlFor="phone" className="text-base">
              Phone :
            </Label>
            <Input defaultValue={user.phone} id="phone" name="phone" placeholder="Phone" className="mt-2 w-full" />
          </div>
          <div>
            <Label htmlFor="password" className="text-base">
              Password :
            </Label>
            <Input type="password" id="password" name="password" placeholder="Password" className="mt-2 w-full" />
          </div>
        </div>
      </form>
      <div className="mt-4">
        <Label htmlFor="mangeAccount" className="text-right text-base">
          Mange account :
        </Label>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="ghost" className="ml-2 mt-2 text-red-500 hover:text-red-500 px-2">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Save Changes
    </Button>
  );
}
