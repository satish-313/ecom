export function LoadingComponet() {
    return (
        <div className="flex justify-center items-center bg-red-300 w-fit mx-auto px-8 py-4 space-x-4 rounded-md">
            <div className="w-16 h-16 rounded-full border-8 border-red-800 border-t-transparent animate-spin ease-linear"></div>
            <p className="font-semibold text-2xl text-red-800">Loading...</p>
        </div>
    );
}
