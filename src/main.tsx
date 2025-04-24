import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rootRoute } from "./routes/__root.tsx";
import { indexRoute } from "./routes/index.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { fileManagerRoute } from "./routes/file-manager.tsx";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const cognitoAuthConfig = {
    authority: import.meta.env.VITE_COGNITO_AUTHORITY,
    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
    response_type: "code",
    scope: import.meta.env.VITE_COGNITO_SCOPE,
};

console.log(cognitoAuthConfig);

const routeTree = rootRoute.addChildren([indexRoute, fileManagerRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
);
