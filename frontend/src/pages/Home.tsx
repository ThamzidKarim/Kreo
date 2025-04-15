import { Link } from "react-router";

import NavBar from "../components/NavBar.tsx";

function Home() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <div className="flex justify-center ml-auto min-h-screen pt-[50px]">
            <Link to="/new-project" className="relative w-[90%] max-w-[924px] h-[250px] bg-[#EBE7E7] rounded-[46px] left-[100px] hover:bg-[#adadad] cursor-pointer shadow-lg">
                <div className="absolute w-[60px] h-px left-[20%] top-[50%] border border-black" />
                <div className="absolute w-[60px] h-px left-[23%] top-[40%] rotate-90 origin-top-left border border-black" />
                <div className="absolute top-[30%] left-[32%] text-[6vw] md:text-[84px] text-black font-inter font-normal leading-none">
                    New Project
                </div>
            </Link>
            </div>
            <div className="w-[222px] h-[44px] absolute top-[468px] left-[384px] rounded-[20px] border border-gray-300 p-[12px] gap-[8px]" />
        </div>
    );
}

export default Home;
