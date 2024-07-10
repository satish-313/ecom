import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/")({
    component: Shop,
});

function Shop() {
    return <div>Shop page d d</div>;
}
