import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Desktop1 from "./pages/Desktop1";
import Desktop2 from "./pages/Desktop2";
import Desktop3 from "./pages/Desktop3";
import Desktop4 from "./pages/Desktop4";
import Desktop5 from "./pages/Desktop5";
import Desktop6 from "./pages/Desktop6";
import Desktop7 from "./pages/Desktop7";
import Desktop8 from "./pages/Desktop8";
import Desktop9 from "./pages/Desktop9";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    ScrollTrigger.defaults({
      scroller: scroller,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    scroller.addEventListener("scroll", handleScroll);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="w-full h-screen overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch]"
    >
      <Desktop1 scrollerRef={scrollerRef} />
      <Desktop2 scrollerRef={scrollerRef} />
      <Desktop3 scrollerRef={scrollerRef} />
      <Desktop4 scrollerRef={scrollerRef} />
      <Desktop5 scrollerRef={scrollerRef} />
      <Desktop6 scrollerRef={scrollerRef} />
      <Desktop7 scrollerRef={scrollerRef} />
      <Desktop8 scrollerRef={scrollerRef} />
      <Desktop9 scrollerRef={scrollerRef} />
    </div>
  );
}

export default App;