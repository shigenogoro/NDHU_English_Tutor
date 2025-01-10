import React from "react";
import { useRoutes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VerbAndSentencePatternPage from "./pages/VerbAndSentencePatternPage";

const App = () => {
    let element = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/verb-and-sentence-pattern-page',
            element: <VerbAndSentencePatternPage />
        }
    ])


    return (
      <div>
        { element }
        <Footer />
      </div>
    )
}

export default App;