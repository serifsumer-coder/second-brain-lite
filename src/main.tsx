import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

function initDarkMode() {
  const saved = localStorage.getItem("darkMode")
  if (saved === "true") {
    document.documentElement.classList.add("dark")
  }
}

initDarkMode()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)