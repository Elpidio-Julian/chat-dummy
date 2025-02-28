import { redirect } from "next/navigation";

import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient();

// Get current user
const { data: { user }, error: userError } = await supabase.auth.getUser();
  
if (userError || !user) {
    redirect('/sign-in');
  } else {
    redirect('/protected/workspace');
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 items-center justify-center">
        <div className="animate-pulse">
          Redirecting...
        </div>
      </main>
    </>
  );
}
