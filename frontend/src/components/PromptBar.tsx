function PromptBar() {
    
    return (
        <div className="h-[121px] w-[1000px] bg-[#FFFFFF] rounded-[30px] outline-1 outline-gray-300 cursor-text shadow-lg input">
            <input 
                type="text" 
                className="w-full bg-transparent text-lg px-10 py-6 outline-none" 
                placeholder="Describe your scenes..." 
            />
        </div>
    );
}

export default PromptBar;
