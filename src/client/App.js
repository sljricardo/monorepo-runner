import { useEffect, useState } from "react";
import "./style/App.css";

const { ipcRenderer } = window.require("electron");

function App() {
  const [initial, setInitial] = useState("");
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    // Request initial event
    ipcRenderer.send("initial:request");
    // Listen for the event
    ipcRenderer.on("initial:request", (event, arg) => {
      setInitial(arg);
    });
    // Listen for the event
    ipcRenderer.on("server:response", (event, arg) => {
      setServerData(arg);
    });
    // Clean the listener after the component is dismounted
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  return (
    <div className="App">
      <h4>
        Initial information <br />
        {initial}
      </h4>
      <br />
      <button onClick={() => ipcRenderer.send("client:request")}>
        Request Main Process info
      </button>
      <br />
      <h2>{serverData}</h2>
    </div>
  );
}

export default App;
