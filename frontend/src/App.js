import "@/App.css";
import "lenis/dist/lenis.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import useLenis from "@/hooks/useLenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GrowthJourney from "@/components/GrowthJourney";
import Services from "@/components/Services";
import WhyYamet from "@/components/WhyYamet";
import Conditions from "@/components/Conditions";
import Workflow from "@/components/Workflow";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ClosingCta from "@/components/ClosingCta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import Privasi from "@/components/Privasi";
import NotFound from "@/components/NotFound";

function Landing() {
    return (
        <div className="min-h-dvh bg-yamet-cream text-yamet-ink" data-testid="landing-root">
            <a
                href="#konten"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-yamet-teal-600 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
            >
                Lewati ke konten
            </a>
            <Navbar />
            <main id="konten" tabIndex={-1} className="outline-none">
                <Hero />
                <Gallery />
                <GrowthJourney />
                <Services />
                <WhyYamet />
                <Conditions />
                <Workflow />
                <Testimonials />
                <FAQ />
                <ClosingCta />
                <Contact />
            </main>
            <Footer />
            <FloatingWhatsapp />
            <Toaster position="top-center" richColors closeButton />
        </div>
    );
}

function App() {
    useLenis();
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/privasi" element={<Privasi />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
