export const Download = (tbl) => {
 
  const x = "`${new Date().toISOString()}-registration.json`";

  const str = `import React from "react";
import { localStorageGetItem } from "@/lib/utils";


const Download = ({ message }) => {


  const downloadHandler = () => {
    let localData = localStorageGetItem("${tbl}");
    if (localData) {
      const blob = new Blob([JSON.stringify(localData)], { type: "application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`\${new Date().toISOString()}-backup-${tbl}.json\`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      message("Data download successfully.");
    } else {
      message("Data not available.");
    }
  }


  return (
    <button onClick={downloadHandler} className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
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

