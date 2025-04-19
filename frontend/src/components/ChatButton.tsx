import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

function ChatButton() {
    
    return (
        <div className="flex items-center justify-center rounded-full bg-[#ffffff] hover:bg-[#adadad] cursor-pointer relative w-[40px] h-[40px]">
            <ChatBubbleLeftEllipsisIcon className="size-7" />
        </div>
    );
}

export default ChatButton;
