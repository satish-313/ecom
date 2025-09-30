import CategoryProduct from "@/mycomponents/categoryProduct";
import TopCategories from "@/mycomponents/topcategory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop/$category")({
    component: Product,
});

function Product() {
    const pId = Route.useParams();

    return (
        <>
            <TopCategories />   
            <CategoryProduct cate={pId.category} />
        </>
    );
}
