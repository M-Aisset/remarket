import RegisterPage from "@/components/pages/register/registerPage";

export default function Register({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <RegisterPage searchParams={searchParams} />
    </div>
  );
}
