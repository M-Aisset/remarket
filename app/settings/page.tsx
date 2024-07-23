import SettingsPage from "@/components/pages/settings/settingsPage";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IUser, User } from "@/models/user";
import { notFound } from "next/navigation";

export default async function Settings() {
  const session = await getSession();
  await connectToDatabase();
  const user: IUser | null = await User.findById(session?.user.id);
  if (!session || user === null) notFound();
  return (
    <div>
      <SettingsPage
        user={{
          fullName: user.fullName,
          userName: user.userName,
          profileImageUrl: user.profileImageUrl,
          wilaya: user.wilaya,
          email: user.email,
          phone: user.phone,
        }}
      />
    </div>
  );
}
