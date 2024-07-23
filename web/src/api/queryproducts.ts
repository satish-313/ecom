import {
    keepPreviousData,
    useInfiniteQuery,
    useQuery,
} from "@tanstack/react-query";

const url = "http://localhost:1323";

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

export type category = {
    category_id: string;
    category_name: string;
};

type catetype = {
    data: product[];
    isNext: boolean;
};

type getcate = {
    data: category[];
    isNext: boolean;
};

export function useDisprod() {
    return useQuery({
        queryKey: ["disprod"],
        queryFn: async (): Promise<Array<product>> => {
            const response = await fetch(`${url}/discout_product`);
            return await response.json();
        },
        staleTime: Infinity,
    });
}

export function useCategoryPage(category: string, page: number) {
    return useQuery({
        queryKey: [`${category}Prod`, page],
        queryFn: async (): Promise<product[]> => {
            const response = await fetch(`${url}/category/${category}/${page}`);
            return await response.json();
        },
        placeholderData: keepPreviousData,
    });
}

export function useCateProdInfinity(category: string) {
    return useInfiniteQuery({
        queryKey: [`${category}infi`],
        queryFn: async ({ pageParam }): Promise<catetype> => {
            const response = await fetch(
                `${url}/category/${category}/${pageParam}`
            );
            return response.json();
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.length * allPages.length,
        staleTime: Infinity,
    });
}

export function useGetCategory() {
    return useInfiniteQuery({
        queryKey: [`getCategory`],
        queryFn: async ({ pageParam }): Promise<getcate> => {
            const response = await fetch(
                `${url}/categories/${pageParam}`
            );
            return response.json();
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.length * allPages.length,
        staleTime: Infinity,
    });
}

export function useGetProdId(id: string) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: async (): Promise<product> => {
            const response = await fetch(`${url}/product/${id}`);
            return await response.json();
        },
        staleTime: 100000,
    });
}
