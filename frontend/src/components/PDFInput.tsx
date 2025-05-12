/*
    Author: Thamzid Karim
    Date: 12/5/2025
    Allows users to upload a PDF file and select a page range for prompt generation. 
*/

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Function that lets user upload a file
const PDFInput = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null); // State to hold the uploaded PDF file

    // Handles when selecting a file
    const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setPdfFile(file);
        }
    };

    return (
        <div>
            {/* Card container for the upload UI */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload PDF</CardTitle>
                    <CardDescription>Choose which pages to generate prompts for. A max of 5 pages per generation is recommended</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                     {/* Label styled as a button to trigger file selection */}
                    <Label
                        htmlFor="pdfFile"
                        className="px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    >
                        Upload PDF
                    </Label>
                    <input
                        type="file"
                        id="pdfFile"
                        accept=".pdf"
                        onChange={handlePdfFileChange}
                        className="hidden"
                    /> 
                    {pdfFile && <p className="px-4 py-2 text-sm font-bold text-gray-900 border border-gray-300 rounded-lg bg-gray-50">Selected file: {pdfFile.name}</p>}
                    
                    {/* Page range input form */}
                    <form>
                        <div className="grid w-[80px] items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="page1">From Page</Label>
                                <Input id="pg1" placeholder="From" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="page2">To Page</Label>
                                    <Input id="pg2" placeholder="To" />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PDFInput;
