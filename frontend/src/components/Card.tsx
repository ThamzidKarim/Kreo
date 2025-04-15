import { Button } from '@headlessui/react'

function Card() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
            <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white
             data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700">
                New Project
            </Button>
        </div>
    );
}

export default Card