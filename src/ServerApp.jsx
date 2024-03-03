import { renderToPipeableStream } from "react-dom/server";
// StaticRouter basically react-router that can be in node.
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts,
  );

  return stream;
}
