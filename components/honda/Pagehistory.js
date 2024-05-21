import React, { useState } from "react";
import Addhistory from "./Addhistory";
import { dateDot } from "@/lib/DateDot";


const Pagehistory = ({ message, id }) => {
    const [hondahistorys, setHondahistorys] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");
    const [show, setShow] = useState(false);



    const getData = async () => {
        setWaitMsg('Please Wait...');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hondahistory`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            const filterById = data.filter(honda => honda.hondaId._id === id);
            console.log(data);
            setHondahistorys(filterById);
            setWaitMsg('');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const showPagehistoryForm = () => {
        setShow(true);
        getData();
    }


    const closePagehistoryForm = () => {
        setShow(false);
        message("Data ready");
    }



    const messageHandler = (data) => {
        setMsg(data);
    }


    const deletHandler = async (id) => {
        console.log(id);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hondahistory/${id}`;
            const requestOptions = { method: "PATCH" };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                setMsg("Deleted successfully completed");
            } else {
                throw new Error("Failed to delete hondahistory");
            }
            fetchData();
        } catch (error) {
            console.log(error);
            setMsg("Data deleting error");
        }
        setMsg("Deleted successfully completed!");
    }

  
    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data {waitMsg}</h1>
                            <button onClick={closePagehistoryForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 lg:px-6">
                            <div className="p-2 overflow-auto">
                                <p className="w-full text-sm text-red-700">{msg}</p>
                                <table className="w-full border border-gray-200">
                                    <thead>
                                        <tr className="w-full bg-gray-200">
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Staff</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Honda</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Location</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Remarks</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Picurl</th>
                                            <th className="text-center border-b border-gray-200 px-4 py-2">Page No</th>
                                            <th className="w-[100px] font-normal">
                                                <div className="w-full flex justify-end py-0.5 pr-4">
                                                    <Addhistory message={messageHandler} id={id} />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hondahistorys.length ? (
                                            hondahistorys.map((hondahistory, i) => (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={hondahistory._id}>
                                                    <td className="text-center py-2 px-4">{i + 1}. {dateDot(hondahistory.dt, true)}</td>
                                                    <td className="text-center py-2 px-4">{hondahistory.staffId ? hondahistory.staffId.nmEn : 'null'}-{hondahistory.postId ? hondahistory.postId.nmEn : 'error'} ({hondahistory.projectId.name})</td>
                                                    <td className="text-center py-2 px-4">{hondahistory.hondaId.regNo}</td>
                                                    <td className="text-center py-2 px-4">{hondahistory.location}</td>
                                                    <td className="text-center py-2 px-4">{hondahistory.remarks}</td>
                                                    <td className="text-center py-2 px-4">{/*hondahistory.picUrl*/}</td>
                                                    <td className="text-center py-2 px-4">{hondahistory.pageNo}</td>
                                                    <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                                        <button onClick={() => deletHandler(hondahistory._id)} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center py-10 px-4">
                                                    Data not available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            <button onClick={showPagehistoryForm} className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500" title="Details">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </>
    )
}
export default Pagehistory;

