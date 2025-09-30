export function ErrorComponent({ err }: { err: string }) {
    return (
        <div className="bg-red-300 w-fit text-center p-5 rounded-md mx-auto mt-10">
            <p className="text-2xl font-semibold text-red-800">err : {err}</p>
        </div>
    );
}
