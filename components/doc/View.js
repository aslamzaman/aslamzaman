import React, { useState } from "react";
import { TextEn, BtnSubmit, BtnEn } from "@/components/Form";
import { Close } from "@/components/Icons";
import { fetchAll, fetchOne, updateOne } from "@/lib/DexieDatabase";


const View = ({ message, id }) => {
    const [docs, setDocs] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");



    const showViewForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {
            const [docResponse, doc_catResponse] = await Promise.all([
                fetchAll("doc"),
                fetchAll("doc_cat")
            ]);

            const docData = docResponse.data;
            const doc_catData = doc_catResponse.data;

            const jointData = docData.map(doc => {
                const matchDoc_cat = doc_catData.find(doc_cat => parseInt(doc_cat.id) === parseInt(doc.doc_cat_id));
                return {
                    ...doc,
                    doc_cat: matchDoc_cat ? matchDoc_cat.name : 'Error!'
                }
            });

            const result = jointData.filter(doc => parseInt(doc.doc_cat_id) === parseInt(id));
            setDocs(result);
            const pageTitle = result.find(doc => parseInt(doc.doc_cat_id) === parseInt(id));
            console.log(pageTitle)
            setTitle(pageTitle.doc_cat);

            console.log(result)
        } catch (err) {
            console.log(err);
        }
    };


    const closeViewForm = () => {
        setShow(false);
        message("Data ready.");
    };



    return (
        <>
            {show && (
                <div className="fixed inset-0 py-8 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">{title}</h1>
                            <Close Click={closeViewForm} Size="w-8 h-8" />
                        </div>

                        <div className="px-6 p-4 text-black">

                            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {
                                    docs.length ? docs.map((doc, i) => {
                                        return (
                                            <div className="w-full p-4 border-2 flex items-center bg-gray-100 rounded-md" key={doc.id}>
                                                <img className="w-full" src={`${doc.picurl}`} alt="aslam" />
                                            </div>
                                        )
                                    })
                                        : null
                                }
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnEn Title="Close" Click={closeViewForm} Class="bg-pink-600 hover:bg-pink-800 text-white" />
                            </div>

                        </div>


                    </div >
                </div >
            )}
            <button onClick={showViewForm} title="Edit" className="w-8 h-8 rounded-full hover:bg-gray-200 mr-1 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default View;


