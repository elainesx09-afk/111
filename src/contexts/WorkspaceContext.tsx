// src/contexts/WorkspaceContext.tsx
import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

console.log("📦 WorkspaceContext: Carregando...");

type Workspace = {
  id: string;
  name: string;
};

interface WorkspaceContextType {
  currentWorkspace: Workspace;
  setCurrentWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
  loading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const ENV_WORKSPACE_ID = (import.meta.env.VITE_WORKSPACE_ID as string | undefined) ?? "";
console.log("🏢 WorkspaceContext: ENV_WORKSPACE_ID =", ENV_WORKSPACE_ID || "(vazio)");

function safeId(v: string) {
  const s = (v || "").trim();
  // Nunca deixa vazio (isso quebra fetch e páginas)
  return s.length > 0 ? s : "demo-workspace";
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  console.log("🏢 WorkspaceProvider: Iniciando...");
  
  const workspaces = useMemo<Workspace[]>(() => {
    const id = safeId(ENV_WORKSPACE_ID);
    console.log("🏢 WorkspaceProvider: Workspace ID final =", id);
    return [{ id, name: "DEMO" }];
  }, []);

  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[0]);
  console.log("🏢 WorkspaceProvider: currentWorkspace =", currentWorkspace);

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, setCurrentWorkspace, workspaces, loading: false }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return context;
}

console.log("✅ WorkspaceContext: Definido");
