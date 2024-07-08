import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/shop")({
    component: Shop,
});

function Shop() {
    return <div>Shop page</div>;
}
