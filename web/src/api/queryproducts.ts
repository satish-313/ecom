import {
    keepPreviousData,
    useInfiniteQuery,
    useQuery,
} from "@tanstack/react-query";

export type product = {
    product_id: number;
    title: string;
    description: string;
    price: number;
    discount_percentage: number;
    stock: number;
    brand: string;
    weight: number;
    dimensions: string;
    shipping_information: string;
    return_policy: string;
    thumbnail: string;
};

type catetype = {
    data: product[];
    isNext: boolean;
};

export function useDisprod() {
    return useQuery({
        queryKey: ["disprod"],
        queryFn: async (): Promise<Array<product>> => {
            const response = await fetch(
                "http://localhost:1323/discout_product"
            );
            return await response.json();
        },
        staleTime: 50000,
    });
}

export function useCateProd(category: string, offset: number) {
    return useQuery({
        queryKey: [`${category}Prod`, offset],
        queryFn: async (): Promise<product[]> => {
            const response = await fetch(
                `http://localhost:1323/category/${category}/${offset}`
            );
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
}

export function useCateProdInfinity(category: string) {
    return useInfiniteQuery({
        queryKey: [`${category}`],
        queryFn: async ({ pageParam }): Promise<catetype> => {
            const response = await fetch(
                `http://localhost:1323/category/${category}/${pageParam}`
            );
            return response.json();
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.length * allPages.length,
    });
}
