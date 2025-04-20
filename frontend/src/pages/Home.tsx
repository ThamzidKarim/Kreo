import { Link } from "react-router";

import NavBar from "../components/NavBar.tsx";
import Card from "../components/Card.tsx";
import ChatButton from "../components/ChatButton.tsx";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function Home() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />

            {/* Chat Button */}
            <div className="absolute top-4 right-4 ">
                <ChatButton />
            </div>

            <div className="flex flex-col items-center gap-[50px] pt-[50px]">
                {/* New Project Button */}
                <Link
                    to="/new-project"
                    className="relative ml-[250px] w-[90%] max-w-[924px] h-[250px] bg-[#EBE7E7] rounded-[46px] hover:bg-[#adadad] cursor-pointer shadow-lg"
                >
                    <PlusCircleIcon className="relative size-12 left-[210px] top-[100px]" />
                    <div className="absolute top-[30%] left-[32%] text-[6vw] md:text-[84px] text-black font-inter font-normal leading-none">
                        New Project
                    </div>
                </Link>

                {/* My Projects Section */}
                <div className="flex flex-col items-start w-full max-w-[924px] px-4 gap-4">
                    <div className="w-[222px] h-[44px] rounded-[20px] border border-gray-300 p-[12px] gap-[8px] flex justify-center items-center hover:bg-[#adadad] cursor-pointer shadow-lg">
                        My Projects
                    </div>

                    {/* Project Cards */}
                    <div className="flex flex-wrap gap-[40px] mt-4">
                        <Card
                            title="Project 1"
                            imageUrl="https://via.placeholder.com/400"
                        />
                        <Card
                            title="Project 2"
                            imageUrl="https://via.placeholder.com/400"
                        />
                    </div>
                </div>
            </div> 
        </div>
    );
}


export default Home;
