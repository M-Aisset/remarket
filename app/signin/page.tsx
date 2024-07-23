import SigninPage from "@/components/pages/signin/signinPage";

export default function Signin({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <SigninPage searchParams={searchParams} />
    </div>
  );
}
