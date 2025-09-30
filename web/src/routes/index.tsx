import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingComponet } from "@/mycomponents/loading";

const CategoryProduct = lazy(() => import("@/mycomponents/categoryProduct"));
const CustomCarousel = lazy(() => import("@/mycomponents/carousel"));

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <div>
            <Suspense fallback={<LoadingComponet />}>
                <CustomCarousel />
                <CategoryProduct cate="smartphones" />
                <CategoryProduct cate="sports equipment" />
                <CategoryProduct cate="groceries" />
            </Suspense>
        </div>
    );
}
