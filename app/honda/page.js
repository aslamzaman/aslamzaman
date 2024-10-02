"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/honda/Add";
import Edit from "@/components/honda/Edit";
import Delete from "@/components/honda/Delete";
import History from "@/components/honda/history";
import { fetchDataFromAPI, formatedDateDot, sessionStorageSetItem } from "@/lib/utils";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";




const Honda = () => {
    const [hondas, setHondas] = useState([]);
    const [hondahistoris, setHondahistoris] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");
    const router = useRouter();



    useEffect(() => {
        const fetchData = async () => {
            setWaitMsg('Please Wait...');
            try {

                const [data, hondahistory] = await Promise.all([
                    fetchDataFromAPI("honda"),
                    fetchDataFromAPI("hondahistory")
                ]);
                const sortData = data.sort((a, b) => (a.unitId.nmEn).toUpperCase() < (b.unitId.nmEn).toUpperCase() ? -1 : 1)
                console.log(sortData, hondahistory);
                setHondas(sortData);
                setHondahistoris(hondahistory);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
                setMsg("Failed to fetch data");
            }
        };
        fetchData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const printHandler = () => {
        const joinHonda = hondas.map(honda => {
            const matchHistory = hondahistoris.find(history => history.hondaId._id === honda._id);
            return {
                ...honda,
                history: matchHistory ? matchHistory : {}
            }
        })


        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true
        });

        let y = 40;

        doc.setFontSize(14);
        doc.text("Centre for Mass Education in Science(CMES)", 105, 20, null, null, 'center');
        doc.text(`${formatedDateDot(new Date(), true)}`, 105, 26, null, null, 'center');

        doc.setFontSize(10);
        doc.text("Origin", 66, 35, null, null, 'center');
        doc.text("Present", 160, 35, null, null, 'center');
        for (let i = 0; i < joinHonda.length; i++) {
            const sp = doc.splitTextToSize(`${joinHonda[i].history.name ? joinHonda[i].history.name : '-'}`, 45);
            const unitProject = `${joinHonda[i].history.unit} - ${joinHonda[i].history.project}`;
            doc.text(`${i + 1}`, 15, y, null, null, 'center');
            doc.text(`${joinHonda[i].unitId.nmEn}`, 20, y, null, null, 'left');
            doc.text(`${joinHonda[i].regNo}`, 65, y, null, null, 'center');
            doc.text(`${joinHonda[i].projectId.name}`, 102, y, null, null, 'center');
            doc.text(sp, 115, y, null, null, 'left');
            //   doc.text(`${joinHonda[i].history.unit ? joinHonda[i].history.unit : '-'}`, 160, y, null, null, 'left');
            doc.text(`${unitProject}`, 160, y, null, null, 'left');

            const lineNumber = sp.length;
            const lineHeight = doc.getLineHeightFactor();

            y += lineNumber * 5 * lineHeight;

        }
        doc.line(20,36, 111, 36);
        doc.line(115, 36, 203, 36);

        doc.line(113.5, 37, 113.5, 219);
        doc.save("honda_summary.pdf");

        console.log(joinHonda);

    }


    const goToHistoryPage = (id) => {
        sessionStorageSetItem('hondaId', id);
        router.push('/hondahistory');
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Honda</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <button onClick={printHandler}>Print</button>
                <div className="p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Unit</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Regdt</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Chassis No</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Engine No</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Condition</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Project</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Remarks</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end py-0.5 pr-4">

                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {hondas.length ? (
                                hondas.map((honda, i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={honda._id}>
                                        <td className="text-center py-2 px-4">{i + 1}</td>
                                        <td className="text-center py-2 px-4">{honda.unitId.nmEn}</td>
                                        <td className="text-center py-2 px-4">{honda.regNo}</td>
                                        <td className="text-center py-2 px-4">{honda.regDt}</td>
                                        <td className="text-center py-2 px-4">{honda.chassisNo}</td>
                                        <td className="text-center py-2 px-4">{honda.engineNo}</td>
                                        <td className="text-center py-2 px-4">{honda.condition}</td>
                                        <td className="text-center py-2 px-4">{honda.projectId.name}</td>
                                        <td className="text-center py-2 px-4">{honda.remarks}</td>
                                        <td className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <button onClick={() => goToHistoryPage(honda._id)}>GO TO</button>
                                            <Edit message={messageHandler} id={honda._id} data={honda} />
                                            <Delete message={messageHandler} id={honda._id} data={honda} />
                                            <History message={messageHandler} id={honda._id} />
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
        </>
    );

};

export default Honda;


