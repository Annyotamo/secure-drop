import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

export const rootRoute = createRootRoute({
    component: () => {
        const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
        return (
            <>
                <Navbar setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
                <Outlet />
            </>
        );
    },
});
