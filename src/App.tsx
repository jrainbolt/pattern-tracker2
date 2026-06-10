import { NavLink, Route, Routes } from "react-router-dom";
import { useProgress } from "./hooks/useProgress";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import Review from "./pages/Review";
import Roadmap from "./pages/Roadmap";
import VisualizerDetail from "./pages/VisualizerDetail";
import Visualizers from "./pages/Visualizers";

function App() {
  const progressApi = useProgress();

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand" aria-label="Interview Pattern Trainer home">
          <span className="brandMark">IP</span>
          <span>Interview Pattern Trainer</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink to="/review">Review</NavLink>
          <NavLink to="/visualizers">Visualizers</NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard {...progressApi} />} />
          <Route path="/learn" element={<Learn progress={progressApi.progress} />} />
          <Route path="/learn/:patternId" element={<Lesson {...progressApi} />} />
          <Route path="/quiz" element={<Quiz {...progressApi} />} />
          <Route path="/review" element={<Review {...progressApi} />} />
          <Route path="/visualizers" element={<Visualizers progress={progressApi.progress} />} />
          <Route path="/visualizers/:visualizerId" element={<VisualizerDetail {...progressApi} />} />
          <Route path="/roadmap" element={<Roadmap {...progressApi} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
