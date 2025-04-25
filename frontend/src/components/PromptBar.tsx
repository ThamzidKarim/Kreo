function PromptBar() {
    
    return (
        <div className="h-[121px] w-[1000px] bg-[#FFFFFF] rounded-[30px] outline-1 outline-gray-300 cursor-text shadow-lg input">
            <input 
                type="text" 
                className="w-full bg-transparent text-lg px-10 py-6 outline-none" 
                placeholder="Describe your scenes..." 
            />
            <div className="flex justify-end mt-[-50px] mr-10">
                <button className="bg-[#F2F2F2] text-[#000000] rounded-[20px] px-4 py-2 font-semibold">Generate</button>
            </div>
        </div>
    );
}

export default PromptBar;
