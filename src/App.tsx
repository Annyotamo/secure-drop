import React, { useState } from "react";
import HeroSection from "./components/Hero/HeroSection";
import FeatureHighlights from "./components/Static/FeatureHighlights";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <HeroSection />
            <FeatureHighlights />
        </div>
    );
};

export default App;
