import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Header from "@/components/header";
export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  } else {
    return redirect("/protected/workspace");
  }

  return (
    <div>
      Hello World
    </div>
  );
}
