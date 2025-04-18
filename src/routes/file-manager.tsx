import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import FileManager from "../components/File manager/FileManager";

export const fileManagerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/file-manager",
    component: () => <FileManager />,
});
