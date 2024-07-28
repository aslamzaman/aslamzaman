import React from "react";
import { excelSheetFromJsonData, formatedDate, localStorageGetItem } from "@/lib/utils";


const Download = ({ Msg }) => {


  const downloadHandler = () => {
    try {
      const locaData = localStorageGetItem("bayprostab");
      excelSheetFromJsonData(locaData, 'Sheet-1', `${formatedDate(new Date())}-backup-bayprostab`);
      Msg("Data downloaded completed.");
    } catch (error) {
      console.error("Faild download data" + error);
      console.log('Fail download data.')
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
