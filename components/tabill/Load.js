import React, { useState } from "react";

import { Close } from "../Icons";
import { fetchAll, clearTable, insertBulk } from "../DexieDatabase";



const Load = ({ Msg }) => {
    const [allData, setAllData] = useState([]);
    const [localtas, setLocaltas] = useState([]);


    const [show, setShow] = useState(false);


    const LoadShow = async () => {
        setShow(true);
        Msg("Ready to print");
        try {
            const datas = await fetchAll('localta_save');
            setAllData(datas);
            const uniqueSaveTime = [...new Set(datas.map(saveTime => saveTime.save_time))];

            const saveTime = uniqueSaveTime.map(uniq => {
                const matchData = datas.find(d => d.save_time === uniq);
                if (matchData) {
                    return matchData;
                }
            })


            console.log("ss1", saveTime);

            setLocaltas(saveTime);
        } catch (err) {
            console.log(err);
        }

    }



    const retriveHanlder = async (id) => {
        const matchingData = allData.filter(local => local.save_time === id);
        console.log(matchingData);
        try {
            await clearTable("localta");
            const dataId = await insertBulk("localta", matchingData);
          //  console.log(dataId);
            Msg("Clear data");
        } catch (err) {
            console.log(err);
        }
        setShow(false);
    }


    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>

                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Open File</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-8 h-8" />
                    </div>

                    <div className="w-full p-4 overflow-auto">

                        <div className="w-full p-4 text-black">
                            <ul>
                                {
                                    localtas ? localtas.map((local, i) => {
                                        return <li onClick={() => retriveHanlder(local.save_time)} className="font-SutonnyMJ_Regular cursor-pointer" key={local.id}>
                                            {i + 1}. {local.place1}-{local.t1} {'=>'} {local.place2}-{local.t2}
                                        </li>
                                    }) : null
                                }
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
            <button onClick={LoadShow} title="Print" className="w-full text-start">Open Existing</button>
        </>
    )
}
export default Load;
