import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="scroll-mt-16 outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Services />
        <Contact />
      </main>
    </>
  );
}
