import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const nstyle = "[&.active]:font-bold";
export const Route = createRootRoute({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className={nstyle}>
                    Home
                </Link>{" "}
                <Link to="/about" className={nstyle}>
                    About
                </Link>
                <Link to="/shop" className={nstyle}>
                    Shop
                </Link>
            </div>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
