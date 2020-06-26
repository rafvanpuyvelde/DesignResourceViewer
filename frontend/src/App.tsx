import React from "react";
import "./App.scss";
import DesignResources from "./components/DesignResources";

function App() {
  return (
    <div className="wrapper-app">
      <header>
        <h1>
          <span role="img" aria-label="cog">
            ⚙️
          </span>{" "}
          Design Resources
        </h1>
      </header>

      <main>
        <DesignResources />
      </main>

      <footer>
        Created with{"\u00A0"}
        <span role="img" aria-label="love">
          ❤️
        </span>
        {"\u00A0"}
        by{"\u00A0"}
        <a href="https://www.linkedin.com/in/raf-vanpuyvelde/">
          Raf Vanpuyvelde
        </a>
      </footer>
    </div>
  );
}

export default App;
