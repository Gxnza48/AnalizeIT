import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Folder, BarChart2, Download, ArrowUp, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const BackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 transform -rotate-45"></div>
    <div className="absolute top-1/4 right-0 w-96 h-96 bg-white opacity-5 transform rotate-12"></div>
    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white opacity-5 transform rotate-45"></div>
    <div className="moving-light"></div>
  </div>
);

function App() {
  const [isVisible, setIsVisible] = React.useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Animate hero section
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Animate features
    gsap.from(featuresRef.current?.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
      },
    });

    // Animate download section
    gsap.from(downloadRef.current?.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: downloadRef.current,
        start: "top 80%",
      },
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0 });
  };

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { 
      duration: 1, 
      scrollTo: { y: `#${sectionId}`, offsetY: 50 },
      ease: "power3.inOut"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundShapes />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">AnalyzeIT</h1>
          <div className="space-x-4">
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-400 transition-colors">Features</button>
            <button onClick={() => scrollToSection('download')} className="hover:text-blue-400 transition-colors">Download</button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center text-center py-20 relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Analyze Your Folders<br />with Precision
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Discover hidden space hogs and optimize your storage effortlessly with AnalyzeIT.
        </p>
        <button onClick={() => scrollToSection('download')} className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
          Get Started
        </button>
      </section>

      <section id="features" ref={featuresRef} className="min-h-screen flex flex-col justify-center items-center py-20 relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
            <Folder className="w-12 h-12 mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Deep Scan</h3>
            <p>Analyze every corner of your storage to uncover hidden space consumers.</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
            <BarChart2 className="w-12 h-12 mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Visual Reports</h3>
            <p>Get clear, interactive visualizations of your storage distribution.</p>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
            <Download className="w-12 h-12 mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2">Quick Clean</h3>
            <p>Identify and remove unnecessary files with just a few clicks.</p>
          </div>
        </div>
      </section>

      <section id="download" ref={downloadRef} className="min-h-screen flex flex-col justify-center items-center text-center py-20 relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Download AnalyzeIT</h2>
        <p className="text-xl mb-8 max-w-2xl">
          Start optimizing your storage today. Download AnalyzeIT for free and take control of your disk space.
        </p>
        <a href="#" className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 mb-6">
          Download Now
        </a>
        <div className="flex items-center justify-center text-lg">
          <Monitor className="mr-2" size={24} />
          <span>Supports Windows 10 and 11</span>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 gradient-text">AnalyzeIT</h3>
              <p>Empowering users to take control of their storage space.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul>
                <li><button onClick={() => scrollToSection('root')} className="hover:text-gray-300">Home</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-gray-300">Features</button></li>
                <li><button onClick={() => scrollToSection('download')} className="hover:text-gray-300">Download</button></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Contact</h4>
              <p>support@analyzit.com</p>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2024 AnalyzeIT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white text-black hover:bg-gray-200 p-3 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;