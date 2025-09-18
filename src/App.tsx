import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import CitizenReportsPage from "./pages/CitizenReportsPage";
import PromiseTrackerPage from "./pages/PromiseTrackerPage";
import FactCheckPage from "./pages/FactCheckPage";
import PublicRegistryPage from "./pages/PublicRegistryPage";
import CMSPage from "./pages/CMSPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kategorie" element={<Categories />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/artykul/:slug" element={<Article />} />
          <Route path="/zgloszenia" element={<CitizenReportsPage />} />
          <Route path="/obietnice" element={<PromiseTrackerPage />} />
          <Route path="/fakty" element={<FactCheckPage />} />
          <Route path="/wnioski" element={<PublicRegistryPage />} />
          <Route path="/cms" element={<CMSPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
