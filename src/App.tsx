import logo from "./logo.svg";
import "./App.css";
import { LoginModal } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginModal />
      </header>
    </div>
  );
}

export default App;
