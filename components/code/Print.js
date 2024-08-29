import { titleCamelCase, titleCase } from "@/lib/utils";

const Print = (tbl, datas) => {


    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let thead_string = "";
    data.map((d, i) => {
        if (i < data.length - 1) {
            if (i > 0) {
                thead_string = thead_string + `                                            <th className="text-center px-4 py-2">${titleCamelCase(d)}</th>\n`
            }
        }
    }
    );


    let td_string = "";
    data.map((d, i) => {
        if (i < data.length - 1) {
            if (i > 0) {
                td_string = td_string + `                                                    <td className="text-center">{${tbl}.${d}}</td>\n`
            }
        }
    });



    const str = `
import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
// import { Tiro_Bangla } from 'next/font/google';
// const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });



const Print = ({ data }) => {
    const [${tbl}s, set${titleCamelCase(tbl)}s] = useState([]);
    const [show, setShow] = useState(false)
    const contentRef = useRef();


    const showPrintForm = () => {
        setShow(true);
        try {
            set${titleCamelCase(tbl)}s(data);
        } catch (error) {
            console.error('Failed to data:', error);
        }
    };



    const closePrintForm = () => {
        setShow(false);
    };



    const pageStyle = \`@media print {
        @page {
            size: A4 portrait;
            margin: 1in;
        }
        footer{
            page-break-after: always;
        }
        #page{
            font-size: 16px;
            font-family: Arial, Helvetica, sans-serif;
        }
    }\`;



    const printButton = () => {
        return (
            <button title="Print" className="w-8 h-8 p-1 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        )
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">

                    <div className="w-11/12 md:w-3/4 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">

                        <div className="px-6 md:px-6 py-3 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Print Form</h1>
                            <div className="flex justify-center items-center space-x-2">
                                <ReactToPrint trigger={printButton} content={() => contentRef.current} pageStyle={pageStyle} documentTitle="${titleCamelCase(tbl)} Print" />
                                <button title="Close" onClick={closePrintForm} className="w-9 h-9 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 text-black">
                            <div id="page" ref={contentRef} className={\`w-full h-auto\`}>

                                <table className="w-full border border-gray-600">
                                    <thead>
                                        <tr className="w-full bg-gray-200 border border-gray-600">
${thead_string}                                       </tr>
                                    </thead>
                                    <tbody>
                                        {${tbl}s.length > 0 ? (
                                            ${tbl}s.map(${tbl} => (
                                                <tr className="border border-gray-600 hover:bg-gray-100" key={${tbl}._id}>
${td_string}                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="border border-gray-600">
                                                <td colSpan={${data.length-2}} className="text-center py-10 px-4">
                                                    Data not available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            )}
            <button onClick={showPrintForm} title="Print" className="px-1 py-1 bg-blue-600 hover:bg-blue-800 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
            </button>
        </>
    )
}
export default Print;



    `;

    return str;
}

export default Print;
