import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/$productid")({
    component: Product,
});

function Product() {
    const pId = Route.useParams();
    console.log(pId.productid)
    return <div>Single Product {pId.productid}</div>;
}
