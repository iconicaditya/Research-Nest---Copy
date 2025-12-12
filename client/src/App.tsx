import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Team from "@/pages/team";
import Research from "@/pages/research";
import Publications from "@/pages/publications";
import Projects from "@/pages/projects";
import Activities from "@/pages/activities";
import Gallery from "@/pages/gallery";
import Login from "@/pages/login";
import Dashboard from "@/pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/research" component={Research} />
      <Route path="/publications" component={Publications} />
      <Route path="/projects" component={Projects} />
      <Route path="/activities" component={Activities} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Team} />
      
      {/* Admin Routes */}
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Dashboard} /> {/* Redirects to login if not auth'd handled by component */}
      <Route path="/admin/dashboard" component={Dashboard} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
