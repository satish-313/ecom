import { createLazyFileRoute } from "@tanstack/react-router";
import {Button} from "@/components/ui/button"

export const Route = createLazyFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <div>
            <h3>Welcome Home!</h3>
            <Button>click</Button>
        </div>
    );
}
