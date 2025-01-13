import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

   if (!user) {
    return redirect("/sign-in");
  } 


  return (
    <main className="flex flex-col min-h-screen">
      {children}
    </main>
  );
}

