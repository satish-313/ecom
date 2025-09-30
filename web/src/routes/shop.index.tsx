import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCategoryPage, useGetCategory } from "@/api/queryproducts";
import { Button } from "@/components/ui/button";
import CategoryProduct from "@/mycomponents/categoryProduct";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import TopCategories from "@/mycomponents/topcategory";

export const Route = createFileRoute("/shop/")({
    component: Shop,
});

function Shop() {
    const [page, setPage] = useState(1);
    const q = useGetCategory();

    return (
        <div>
            <TopCategories />
            <div>
                {q.data?.pages.map((prods, idx) => (
                    <div key={idx}>
                        {prods.data.map((p) => (
                            <div key={p.category_id} className=" p-3">
                                <CategoryProduct cate={p.category_name} />
                            </div>
                        ))}
                    </div>
                ))}
                <Button
                    onClick={() => q.fetchNextPage()}
                    disabled={
                        q.isFetchingNextPage ||
                        !q.data?.pages[q.data.pages.length - 1].isNext
                    }
                    className="block mx-auto mt-2 font-semibold"
                >
                    More Category
                </Button>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {page <= 1 ? "" : <PaginationPrevious href="#" />}
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
