import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login           from "./pages/Login";
import Dashboard       from "./pages/Dashboard";
import Resume          from "./pages/Resume";
import Companies       from "./pages/Companies";
import Analytics       from "./pages/Analytics";
import Learning        from "./pages/Learning";
import MockInterview   from "./pages/MockInterview";
import Analysis        from "./pages/Analysis";
import Settings        from "./pages/Settings";
import Profile         from "./pages/Profile";
import AIResumeBuilder from "./pages/AIResumeBuilder";
import AICoverLetter   from "./pages/AICoverLetter";
import AICoach         from "./pages/AICoach";
/* These pages still exist and are routable but removed from sidebar */
import AIRewriter      from "./pages/AIRewriter";
import AISuggestions   from "./pages/AISuggestions";
import AIOptimize      from "./pages/AIOptimize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<Login />} />
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/resume"            element={<Resume />} />
        <Route path="/companies"         element={<Companies />} />
        <Route path="/analysis"          element={<Analysis />} />
        <Route path="/mock-interview"    element={<MockInterview />} />
        <Route path="/learning"          element={<Learning />} />
        <Route path="/analytics"         element={<Analytics />} />
        <Route path="/settings"          element={<Settings />} />
        <Route path="/profile"           element={<Profile />} />
        {/* ── AI Feature pages ── */}
        <Route path="/ai-resume-builder" element={<AIResumeBuilder />} />
        <Route path="/ai-cover-letter"   element={<AICoverLetter />} />
        <Route path="/ai-coach"          element={<AICoach />} />
        {/* Still accessible by direct URL, just removed from sidebar ── */}
        <Route path="/ai-rewriter"       element={<AIRewriter />} />
        <Route path="/ai-suggestions"    element={<AISuggestions />} />
        <Route path="/ai-optimize"       element={<AIOptimize />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;