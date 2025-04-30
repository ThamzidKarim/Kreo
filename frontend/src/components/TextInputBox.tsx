/**
 * TextInputBox - A textarea component for user input with styling and character limit
 */

function TextInputBox() {
    return (
        <textarea
            className="w-md h-64 p-6 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-950 resize-none"
            placeholder="Type your text here. Max length is 10,000..."
            maxLength={10000}
        />
    );
}

export default TextInputBox;