const DownloadPage = (tbl) => {


   const sv = "            saveAs(blob, new Date().toISOString() + '-"+tbl+".js');";

let str = `import React from "react";
import { saveAs } from "file-saver";


const Download = ({ message  }) => {
    const downloadHandler = () => {
        let localData = localStorage.getItem("${tbl}");
        if (localData) {
            const blob = new Blob([localData], { type: "application/json" });
${sv}            
            message ("Data download successfully.");
        } else {
            message ("Data not available.");
        }
    }


    return (
        <button onClick={downloadHandler} className="w-7 h-7 mr-2 bg-gray-700 hover:bg-gray-900 text-white flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
        </button>
    );
};
export default Download;
`;

 

  return str;
}


export default DownloadPage;