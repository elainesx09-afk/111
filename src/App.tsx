import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { WorkspaceProvider, useWorkspace } from "@/contexts/WorkspaceContext";
import { MainLayout } from "@/components/layout/MainLayout";

import Overview from "./pages/Overview";
import Clients from "./pages/Clients";
import Instances from "./pages/Instances";
import Inbox from "./pages/Inbox";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import FollowUps from "./pages/FollowUps";
import Converted from "./pages/Converted";
import Bot from "./pages/Bot";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

console.log("📦 App.tsx: Iniciando...");

const queryClient = new QueryClient();

function GuardedLayout() {
  console.log("🔒 GuardedLayout: Renderizando...");
  const { user, loading: authLoading } = useAuth();
  const { loading: wsLoading, currentWorkspace } = useWorkspace();

  console.log("🔒 GuardedLayout: authLoading =", authLoading, "user =", !!user);
  console.log("🔒 GuardedLayout: wsLoading =", wsLoading, "workspace =", currentWorkspace?.id);

  if (authLoading) {
    console.log("⏳ GuardedLayout: Aguardando auth...");
    return null;
  }

  if (!user) {
    console.log("🚫 GuardedLayout: Sem usuário, redirecionando para /login");
    return <Navigate to="/login" replace />;
  }

  // segura até ter workspace id válido
  if (wsLoading || !currentWorkspace?.id) {
    console.log("⏳ GuardedLayout: Aguardando workspace...");
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando workspace...
      </div>
    );
  }

  console.log("✅ GuardedLayout: Renderizando MainLayout");
  return <MainLayout />;
}

const App = () => {
  console.log("🎨 App: Renderizando...");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Navigate to="/overview" replace />} />

                <Route element={<GuardedLayout />}>
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/instances" element={<Instances />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/pipeline" element={<Pipeline />} />
                  <Route path="/follow-ups" element={<FollowUps />} />
                  <Route path="/converted" element={<Converted />} />
                  <Route path="/bot" element={<Bot />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WorkspaceProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

console.log("✅ App.tsx: Definido");

export default App;
