import './index.css';

import Header from "./components/Header.tsx";
import NavBar from "./components/NavBar.tsx";
import Card from "./components/Card.tsx";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <Card />
      </div>
    </>
  );
}

export default App
