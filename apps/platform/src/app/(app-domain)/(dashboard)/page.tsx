'use client';

import Image from "next/image";
import { useAuth } from "@crm/composables/authentication/context";
import Link from "next/link";
import { URLS } from "@crm/utils/constants/urls";

export default function Home() {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <Link href={`${URLS.AUTH_DOMAIN_BASE_URL}/sign-in`}>Logo Login</Link>
        <div className="mt-8 border rounded-lg p-6 w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">User Profile</h2>
          
          {isLoading ? (
            <p className="text-zinc-500 animate-pulse">Loading user details...</p>
          ) : user ? (
            <div className="flex items-center gap-4">
              {user.profile_url ? (
                <img 
                  src={user.profile_url} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold uppercase">
                  {user.first_name[0]}{user.last_name[0]}
                </div>
              )}
              
              <div>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-zinc-500">Not logged in.</p>
          )}
        </div>
      </main>
    </div>
  );
}
