import { ReactNode } from "react";
import HeaderAuth from "@/components/header-auth";
import ProtectedSidebar from "@/app/protected/_components/protected-sidebar";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <nav className="w-full border-b border-b-foreground/10 h-16 flex justify-center items-center">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex flex-row items-center gap-5 font-semibold">
            {/* Could link to workspace main page */}
            <p>Chat Dummy - Workspace {params.workspaceId}</p>
          </div>
          <HeaderAuth />
        </div>
      </nav>

      <div className="flex flex-1 w-full">
        {/* Workspace-specific sidebar */}
        <ProtectedSidebar params={{ workspaceId: params.workspaceId }} />

        <main className="flex-1 flex flex-col gap-10 max-w-5xl mx-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
} 