import { useCateProdInfinity } from "@/api/queryproducts";
import { ErrorComponent } from "./error";
import { Button } from "@/components/ui/button";

export default function CategoryProduct({ cate }: { cate: string }) {
    const q = useCateProdInfinity(`${cate}`);
    if (q.isError) return <ErrorComponent err={q.error.message} />;

    return (
        <div>
            <h3 className="font-bold py-4 text-xl text-gray-800 capitalize">
                {cate}
            </h3>
            <div>
                {q.data?.pages.map((prods, idx) => (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2"
                        key={idx}
                    >
                        {prods.data.map((p) => (
                            <div
                                key={p.product_id}
                                className="flex flex-col p-3 space-y-2 border-2 border-blue-800 rounded-md"
                            >
                                <div>
                                    <img src={p.thumbnail} alt={p.title} />
                                </div>
                                <p className="font-semibold text-gray-700 text-sm">
                                    {p.title}
                                </p>
                                <p className="font-bold">$ {p.price}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Button
                onClick={() => q.fetchNextPage()}
                disabled={
                    q.isFetchingNextPage ||
                    !q.data?.pages[q.data.pages.length - 1].isNext
                }
                className="block mx-auto mt-2 font-semibold"
            >
                More
            </Button>
        </div>
    );
}
