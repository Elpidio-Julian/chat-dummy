import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
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
