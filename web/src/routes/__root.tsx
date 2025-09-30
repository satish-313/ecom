import Footer from "@/mycomponents/footer";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const nstyle =
    "decoration-4 decoration-red-500 [&.active]:underline [&.active]:underline-offset-8";
const hstyle =
    "transition delay-300 duration-300 ease-in-out hover:decoration-4 hover:decoration-red-500 hover:underline hover:underline-offset-8";
export const Route = createRootRoute({
    component: Nav,
});

function Nav() {
    return (
        <main className="max-w-screen-lg w-11/12 mx-auto min-h-screen">
            <nav className="flex items-center justify-between font-medium text-lg p-4">
                <div className="font-semibold">
                    <Link to="/">Ecom</Link>
                </div>
                <div className="space-x-5">
                    <Link to="/" className={`${nstyle} ${hstyle}`}>
                        Home
                    </Link>{" "}
                    <Link to="/shop" className={`${nstyle} ${hstyle}`}>
                        Shop
                    </Link>{" "}
                    <Link to="/about" className={`${nstyle} ${hstyle}`}>
                        About
                    </Link>
                </div>
                <div className="flex items-center space-x-5">
                    <Link to="/customer">
                        <img src="/icons/user.svg" alt="user" />
                    </Link>{" "}
                    <Link to="/wishlist">
                        <img src="/icons/heart.svg" alt="wishlist" />
                    </Link>{" "}
                    <Link to="/cart">
                        <img src="/icons/shopping-cart.svg" alt="cart" />
                    </Link>{" "}
                </div>
            </nav>
            <Outlet />
            <Footer />
            <TanStackRouterDevtools />
        </main>
    );
}
