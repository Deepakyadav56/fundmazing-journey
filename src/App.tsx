
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import FundDetails from "./pages/FundDetails";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Calculator from "./pages/Calculator";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/fund/:id" element={<FundDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/goals" element={<Goals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
