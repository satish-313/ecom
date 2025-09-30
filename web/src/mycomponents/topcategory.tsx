import { categories } from "@/api/data";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

type category = {
    name: string;
    category: string;
    thumbnail: string;
};

export default function TopCategories() {
    const [cate, _] = useState<category[]>(categories);
    return (
        <>
            <h3 className="text-center font-bold text-2xl mt-4 mb-2 text-slate-800">
                Top Categories
            </h3>
            <div className="flex flex-wrap gap-3 justify-evenly">
                {cate.map((c, idx) => (
                    <Link
                        to="/shop/$category"
                        params={{ category: c.category }}
                    >
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center p-3 border-4 rounded-md border-blue-500 cursor-pointer"
                        >
                            <div className="w-16 h-16">
                                <img src={c.thumbnail} alt={c.name} />
                            </div>
                            <p>{c.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
