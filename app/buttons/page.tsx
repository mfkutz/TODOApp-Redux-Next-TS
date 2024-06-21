import { Button } from "@/components/ui/button"

const buttons = () => {
    return (
        <div className="flex flex-col items-center">
            <Button variant="primary">primary</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="tertiary">tertiary</Button>
        </div>
    );
}

export default buttons;