import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rootRoute } from "./routes/__root.tsx";
import { indexRoute } from "./routes/index.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { fileManagerRoute } from "./routes/file-manager.tsx";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_4WnB9nATu",
    client_id: "7p984uuatg03rhaapsjt3qqkhr",
    redirect_uri: "http://localhost:3000/file-manager",
    response_type: "code",
    scope: "email openid phone",
};

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
