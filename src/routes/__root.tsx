import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";

export const rootRoute = createRootRoute({
    component: () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    },
});
