import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rootRoute } from "./routes/__root.tsx";
import { indexRoute } from "./routes/index.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { fileManagerRoute } from "./routes/file-manager.tsx";

const routeTree = rootRoute.addChildren([indexRoute, fileManagerRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
