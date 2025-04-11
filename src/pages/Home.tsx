import NavBar from "../components/NavBar.tsx";

function Home() {
    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <div className="flex justify-center ml-auto min-h-screen pt-[50px]">
                <div className="relative w-[90%] max-w-[924px] h-[250px] bg-[#EBE7E7] rounded-[46px] left-[100px]">
                    <div className="absolute w-[60px] h-px left-[20%] top-[50%] border border-black" />
                    <div className="absolute w-[60px] h-px left-[23%] top-[40%] rotate-90 origin-top-left border border-black" />
                    <div className="absolute top-[30%] left-[32%] text-[6vw] md:text-[84px] text-black/60 font-inter font-normal leading-none">
                        New Project
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
