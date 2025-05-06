/**
 * Author: Thamzid Karim
 * Date: 6/5/2025
 * This component displays a basic timeline UI with separate horizontal rails for video and audio tracks.
 */

import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  

function Timeline() {
    return (
        <Card className="flex flex-col items-center w-full">
            <Card className="w-full">
                <CardContent>Video</CardContent>
            </Card> 
            <Card className="w-full">
                <CardContent>Audio</CardContent>
            </Card>    
        </Card>    
    )
}

export default Timeline;