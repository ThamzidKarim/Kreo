/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This page displays the video editor interface with a timeline and media tracks.
 */

import Timeline from "../components/Timeline";
import NavBar from "../components/NavBar";

function Editor() {
    return(
        <div className="flex h-screen">
            <div className="w-[210px]">
                <NavBar />
            </div>

            <div className="flex items-end justify-start overflow-x-auto p-4">
               <Timeline /> 
            </div>
        </div>
    );
} 
export default Editor