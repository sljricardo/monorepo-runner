import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../client/App";

// This module are mock in setupTests
const { ipcRenderer } = require("electron");

describe("App component", () => {
  beforeEach(cleanup);

  it("Should see initial information", () => {
    render(<App />);

    const initialInfo = screen.getByText(/initial information/i);

    expect(initialInfo).toBeInTheDocument();
  });

  it("Should send a ipc request on button click", () => {
    render(<App />);

    const buttonToClick = screen.getByRole("button");

    userEvent.click(buttonToClick);

    expect(ipcRenderer.send).toBeCalledWith("client:request");
  });

  it("Should render ipcMain information in the page", async () => {
    render(<App />);

    // Mock only the second call and simulate the output message
    ipcRenderer.on.mock.calls[1][1](null, "Your request was received");

    const ipcMainResponse = await screen.findByText(
      /Your request was received/i
    );

    expect(ipcMainResponse).toBeInTheDocument();
  });
});
