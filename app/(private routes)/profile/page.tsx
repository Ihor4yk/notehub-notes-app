import Link from "next/link";
import css from "./ProfilePage.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View and manage your personal profile information in NoteHub.",
  openGraph: {
    title: "User Profile",
    description: "Manage your account details and view your profile in NoteHub.",
    url: "https://notehub.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/profile-placeholder.png",
        width: 1200,
        height: 630,
        alt: "Profile Page Preview",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar ?? "https://ac.goit.global/profile-placeholder.png"}
            alt={user?.username ?? "User Avatar"}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username ?? "Unknown User"}</p>
          <p>Email: {user?.email ?? "No email available"}</p>
        </div>
      </div>
    </main>
  );
}
