import { useGetProdId } from "@/api/queryproducts";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
    component: Product,
});

function Product() {
    const pId = Route.useParams();
    const q = useGetProdId(pId.id);

    return (
        <>
            {q.data !== undefined && (
                <>
                    <div className="grid md:grid-cols-2 ">
                        <div>
                            <img
                                className="block mx-auto"
                                src={q.data.thumbnail}
                                alt={q.data.title}
                            />
                            <div className="flex justify-evenly flex-wrap">
                                <Button className="py-8 px-16 bg-orange-400 hover:bg-orange-700">
                                    <img
                                        src="/icons/heart.svg"
                                        alt="wishlist"
                                    />
                                </Button>
                                <Button className="py-8 px-16 bg-orange-600 hover:bg-orange-700">
                                    <img
                                        src="/icons/shopping-cart.svg"
                                        alt="cart"
                                    />
                                </Button>
                            </div>
                        </div>
                        <div className="p-2">
                            <h4 className="font-semibold text-xl text-slate-900">
                                {q.data.title}
                            </h4>
                            <p className="my-2 text-gray-600">
                                {q.data.description}
                            </p>
                            <p className="font-bold text-xl text-gray-900">
                                <span>$ {q.data.price} </span>
                                <span className="ml-3 text-gray-500 line-through">
                                    {Math.round(
                                        q.data.price /
                                            (1 -
                                                q.data?.discount_percentage *
                                                    0.01)
                                    )}
                                </span>
                                <span className="ml-3 text-green-700">
                                    {q.data.discount_percentage} % off
                                </span>
                            </p>
                            <div>
                                <p>
                                    Brand :{" "}
                                    {q.data.brand === "undefined"
                                        ? ""
                                        : q.data.brand}
                                </p>
                                <p>Stock : {q.data.stock}</p>
                                <p>Weight : {q.data.weight}</p>
                                <p>Dimension : {q.data.dimensions}</p>
                                <p>
                                    Shipping Info :{" "}
                                    {q.data.shipping_information}
                                </p>
                                <p>Return Policy : {q.data.return_policy}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-5 p-4 mt-10">
                        <h4 className="font-bold text-xl tracking-wide text-gray-800">
                            Ratings & Reviews
                        </h4>
                    </div>
                </>
            )}
        </>
    );
}
