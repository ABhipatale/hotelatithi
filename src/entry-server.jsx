import { renderToString } from "react-dom/server";

import App from "./App.jsx";

/** Renders the whole page to HTML with no browser involved. */
export function render() {
  return renderToString(<App />);
}
