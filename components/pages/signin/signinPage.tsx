"use client";

import { signin } from "@/actions/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function SigninPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  async function actionHandler(formData: FormData) {
    const data = await signin(formData);
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
    <div className="py-12 w-full flex justify-center items-center">
      <div className="w-full sm:max-w-[32rem] sm:border rounded-lg p-6 sm:dark:bg-dot-white/[0.2] sm:bg-dot-black/[0.2] relative">
        <div className="mb-2">
          <h1 className="text-center font-semibold text-[2.5rem]">Sign in</h1>
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="text-primary hover:text-primary/80"
              href={`/register?from=${
                searchParams.from !== undefined && searchParams.from !== ""
                  ? encodeURIComponent(searchParams.from as string)
                  : "/"
              }`}
            >
              Register
            </Link>
          </p>
        </div>
        <form action={actionHandler}>
          <div className="w-full sm:p-6 p-4">
            <div className="mb-6">
              <Label htmlFor="email" className="text-right ">
                Email :
              </Label>
              <Input id="email" name="email" placeholder="Email" className="mt-2" />
            </div>
            <div className="mb-6">
              <Label htmlFor="password" className="text-right">
                Password :
              </Label>
              <Input placeholder="Password" type="password" id="password" name="password" className="mt-2" />
            </div>
            <div className="flex justify-center items-center gap-6 w-full pt-6">
              <Link
                href={
                  searchParams.from !== undefined && searchParams.from !== "" ? (searchParams.from as string) : "/"
                }
              >
                <Button variant="outline" type="button" className="w-32">
                  Cancel
                </Button>
              </Link>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-32" disabled={pending}>
      Signin
    </Button>
  );
}
