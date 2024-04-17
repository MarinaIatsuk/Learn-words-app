import style from "./App.module.scss";
import Header from "../Header/Header";
import { Home, Games, Error } from "../../Pages";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={style.globalContainer}>
        <header>
          <Header/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/games" element={<Games/>}></Route>
            <Route path="*" element={<Error/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
