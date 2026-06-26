import { RouterProvider } from "react-router";
import { router } from "./routes";

import { AudioProvider } from "./components/audio/AudioProvider";

export default function App() {
  return (
    <AudioProvider>
      <RouterProvider router={router} />
    </AudioProvider>
  );
}