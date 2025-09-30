import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <div>
            <h4 className="font-semibold text-xl text-gray-700 tracking-wide underline underline-offset-8 ">
                About Project
            </h4>
            <p className="mt-4 text-lg">
                Personal fully ecommerce website using React & golang.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className=" border-4 border-gray-500 border-x-slate-500 px-4 py-3 rounded-md">
                    <h5 className="font-semibold text-xl text-gray-700">
                        Front-end
                    </h5>
                    <ul className="list-disc px-6">
                        <li>ReactJS</li>
                        <li>Tanstack query</li>
                        <li>Tanstack Router</li>
                        <li>Tailwindcss</li>
                    </ul>
                </div>
                <div className=" border-4 border-gray-500 border-x-slate-500 px-4 py-3 rounded-md">
                    <h5 className="font-semibold text-xl text-gray-700">
                        Back-end
                    </h5>
                    <ul className="list-disc px-6">
                        <li>Golang</li>
                        <li>Echo</li>
                        <li>Sqlite</li>
                    </ul>
                </div>
            </div>
            <h4 className="font-semibold my-4 text-xl text-gray-700 tracking-wide underline underline-offset-8 ">
                Contact
            </h4>
            <ul className="">
                <li>Email : pradhansatish53@gmail.com</li>
                <li>
                    github :{" "}
                    <a href="https://github.com/satish-313" target="_blank">satish-313</a>
                </li>
            </ul>
        </div>
    );
}
