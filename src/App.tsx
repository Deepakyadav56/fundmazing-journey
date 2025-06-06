
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
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
import SIPDashboard from "./pages/SIPDashboard";
import SIPPerformance from "./pages/SIPPerformance";
import InvestmentHistory from "./pages/InvestmentHistory";
import FundComparison from "./pages/FundComparison";
import MarketNews from "./pages/MarketNews";
import Watchlist from "./pages/Watchlist";
import NewsDetail from "./pages/NewsDetail";
import FundAnalysis from "./pages/FundAnalysis";
import Notifications from "./pages/Notifications";
import InvestmentCart from "./pages/InvestmentCart";
import PaymentGateway from "./pages/PaymentGateway";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import KYCVerification from "./pages/KYCVerification";
import StartSIP from "./pages/StartSIP";
import RedeemFund from "./pages/RedeemFund";
import ManageSIP from "./pages/ManageSIP";
import SIPCalculator from "./pages/SIPCalculator";
import CancelOrder from "./pages/CancelOrder";
import KYCFlow from "./pages/KYCFlow";
import RiskProfiling from "./pages/RiskProfiling";
import RiskResults from "./pages/RiskResults";
import BankAccounts from "./pages/BankAccounts";
import MandateManagement from "./pages/MandateManagement";
import GoalBasedInvesting from "./pages/GoalBasedInvesting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/fund/:id" element={<FundDetails />} />
          <Route path="/fund-analysis/:id" element={<FundAnalysis />} />
          <Route path="/start-sip/:id" element={<StartSIP />} />
          <Route path="/redeem/:id" element={<RedeemFund />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/sip-dashboard" element={<SIPDashboard />} />
          <Route path="/sip-performance/:id" element={<SIPPerformance />} />
          <Route path="/manage-sip/:id" element={<ManageSIP />} />
          <Route path="/investment-history" element={<InvestmentHistory />} />
          <Route path="/fund-comparison" element={<FundComparison />} />
          <Route path="/market-news" element={<MarketNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<InvestmentCart />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/cancel-order/:id" element={<CancelOrder />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
          
          {/* New Routes */}
          <Route path="/kyc-flow" element={<KYCFlow />} />
          <Route path="/risk-profiling" element={<RiskProfiling />} />
          <Route path="/risk-results" element={<RiskResults />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/mandate-management" element={<MandateManagement />} />
          <Route path="/goal-based-investing" element={<GoalBasedInvesting />} />
          
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
