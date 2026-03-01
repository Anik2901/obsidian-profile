import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Docs from "./pages/Docs";
import Dashboard from "./pages/Dashboard";
import Discovery from "./pages/Discovery";
import MatchDetail from "./pages/MatchDetail";
import MessagesPage from "./pages/Messages";
import ChatThread from "./pages/ChatThread";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import AgentSetup from "./pages/AgentSetup";
import AgentActivity from "./pages/AgentActivity";
import ViewProfile from "./pages/ViewProfile";
import BlockedUsers from "./pages/BlockedUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/docs" element={<Docs />} />

            {/* Authenticated */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/matches" element={<ProtectedRoute><Discovery /></ProtectedRoute>} />
            <Route path="/match/:id" element={<ProtectedRoute><MatchDetail /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/chat/:id" element={<ProtectedRoute><ChatThread /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/agent" element={<ProtectedRoute><AgentSetup /></ProtectedRoute>} />
            <Route path="/agent/activity" element={<ProtectedRoute><AgentActivity /></ProtectedRoute>} />
            <Route path="/profile/:id" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
            <Route path="/blocked" element={<ProtectedRoute><BlockedUsers /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
