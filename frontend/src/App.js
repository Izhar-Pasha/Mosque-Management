import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import ErrorBoundary from "./components/Error_Boundary/errBoundary.jsx";
import { Toaster } from "react-hot-toast";
import { MyProvider } from "./context/categoryContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Saathi from "./components/Saathi/Saathi.jsx";
import Professional from "./components/Professional/Professional.jsx";
import Student from "./components/Student/Student.jsx";
import Login from "./components/Login/Login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <MyProvider>
            <Routes>
              <Route path="/auth" element={<Login />} />
              <Route element={<Navbar />}>
                <Route path="/api/dashboard" element={<Dashboard />} />
                <Route path="/api/saathi" element={<Saathi />} />
                <Route path="/api/professional" element={<Professional />} />
                <Route path="/api/student" element={<Student />} />
              </Route>
            </Routes>
            <Toaster />
          </MyProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
