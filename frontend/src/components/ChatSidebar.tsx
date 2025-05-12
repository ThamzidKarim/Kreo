// Author: Thamzid Karim
// Date: 12/5/2025
// Chat sidebar component that shows the user's and AI's conversation.

// Function to display array of messages on side for chatbot
function ChatSidebar({ messages }: { messages: { userPrompt: string, aiResponse: string }[] }) {
    return (
        <div className="w-[400px] h-full bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chat</h2>
            {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                    <p className="text-right font-semibold">YOU: {msg.userPrompt}</p>
                    <p className="text-left text-gray-800">KREO: {msg.aiResponse}</p>
                </div>
            ))}
        </div>
    );
}

export default ChatSidebar;
