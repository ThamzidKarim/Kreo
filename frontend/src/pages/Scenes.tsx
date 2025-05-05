/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * Scenes page that receives prompts from Story page via state and displays them.
 */

import { useLocation } from "react-router";
import NavBar from "../components/NavBar";

function Scenes() {
    // useLocation hook to access the location object, which contains the state passed from the Story page
    const location = useLocation();
    const { prompts } = location.state || {};

    return(
        <div>
            <NavBar />
            <div className="flex justify-center items-start h-screen mt-16">
                <h1>Storyboard</h1>
            </div>
            <div className="flex flex-col items-center mt-8">
                {/* Display the prompts received from the Story page*/}
                {prompts ? (
                    prompts.map((prompt: string, index: number) => (
                        <p key={index} className="text-center">{prompt}</p>
                    ))
                ) : (
                    <p>No prompts to display</p>
                )}
            </div>
        </div>
    );

}

export default Scenes
