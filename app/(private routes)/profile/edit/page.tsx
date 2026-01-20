"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      getMe().then(currentUser => {
        setUser(currentUser);
        setUsername(currentUser.username ?? "");
        setEmail(currentUser.email ?? "");
        setAvatar(currentUser.avatar ?? "");
      });
    } else {
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
      setAvatar(user.avatar ?? "");
    }
  }, [user, setUser]);

  async function handleSave(formData: FormData) {
    try {
      const username = formData.get("username") as string;

      const updatedUser = await updateMe({ username });

      setUser({
        email: updatedUser.email,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />}

        <form className={css.profileInfo} action={handleSave}>
          <div className={css.usernameWrapper}>
            <label className={css.label} htmlFor="username">
              Username:
            </label>
            <input id="username" name="username" type="text" className={css.input} defaultValue={username} required />
          </div>

          <div className={css.emailWrapper}>
            <label className={css.label} htmlFor="email">
              Email:
            </label>
            <input id="email" name="email" type="email" className={css.input} value={email} readOnly />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
