import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterPrincipal from "./components/router/RouterPrincipal";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <RouterPrincipal />
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
