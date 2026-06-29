import { Routes, Route } from "react-router-dom";
import { usePageMeta } from "./hooks/usePageMeta";
import Desktop1 from "./pages/Desktop1";
import Desktop2 from "./pages/Desktop2";

function App() {
  usePageMeta();
  return (
    <>
      <Desktop1 />
      <Desktop2 />
    </>
  );
}

export default App;