import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import FundsListPage from "@/pages/FundsListPage";
import FundDetailPage from "@/pages/FundDetailPage";
import ComparePage from "@/pages/ComparePage";
import RiskQuizPage from "@/pages/RiskQuizPage";
import LoginPage from "@/pages/LoginPage";
import EducationPage from "@/pages/EducationPage";
import InvestorDashboard from "@/pages/InvestorDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AdvisorDashboard from "@/pages/AdvisorDashboard";
import AnalystDashboard from "@/pages/AnalystDashboard";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import ApiDemo from "@/components/ApiDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/funds" element={<FundsListPage />} />
            <Route path="/funds/:id" element={<FundDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/risk-quiz" element={<RiskQuizPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/advisor" element={<AdvisorDashboard />} />
            <Route path="/dashboard/analyst" element={<AnalystDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/api-demo" element={<ApiDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
