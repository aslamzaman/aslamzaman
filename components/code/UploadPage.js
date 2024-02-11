const UploadPage = (tbl) => {




    let str = `import React, { useState } from "react";
import { BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";


const Upload = ({ message }) => {
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);


    const showUploadForm = () => {
        setShow(true);
        message("Ready to upload");
    }


    const uploadHandler = (e) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (() => {
                let checkData = JSON.parse(reader.result)[0];
                if (!checkData.name) {
                    message("Data not match!");
                    setShow(false);
                    return false;
                };

                localStorage.setItem("${tbl}", reader.result);
                message("Data loaded successfully");
                setShow(false);
            })
            reader.readAsText(file);
        } else {
            message("Please select a file.");
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">File Upload</h1>
                            <Close Click={() => { setShow(false); message("Data ready") }} Size="w-8 h-8" />
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <input type="file" onChange={(e) => { setFile(e.target.files[0]); }} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept="application/javascript" />

                            <div className="px-6 py-6 flex justify-end items-center border-t border-gray-300">
                                <BtnEn Title="Close" Click={() => { setShow(false); message("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white mr-1" />
                                <BtnEn Title="Upload" Click={uploadHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showUploadForm} className="px-2 py-1 text-sm font-bold text-blue-900 hover:text-blue-500">Upload</button>
        </>
    )
}

export default Upload;
`;
  
return str;
}


export default UploadPage;
