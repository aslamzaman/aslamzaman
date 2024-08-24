"use client";
import React, { useState, useEffect } from "react";
import { TextDt, BtnSubmit, TextEn } from "@/components/Form";
import { localStorageGetItem, formatedDate, localStorageSetItem } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Add from "@/components/increment/Add";
import Edit from "@/components/increment/Edit";
import Delete from "@/components/increment/Delete";



const Increment = () => {
    const [increments, setIncrements] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");

    const [incomeYr, setIncomeYr] = useState("");
    const [dt, setDt] = useState("");
    const [activeDt, setActiveDt] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = localStorageGetItem("increment");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setIncrements(result);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        setIncomeYr("2023-2024");
        setDt(formatedDate(new Date()));
        setActiveDt(formatedDate(new Date()));

    }, [msg])


    const messageHandler = (data) => {
        setMsg(data);
    }


    const createPrintPage = (e) => {
        e.preventDefault();
        if (increments.length < 1) {
            setMsg("No data!");
            return false;
        }
        const fullyr = new Date().getFullYear();
        const data = {
            incomeYr: incomeYr,
            dt: dt,
            activeDt: activeDt,
            fullyr: fullyr,
            increments: increments
        }
        const response = localStorageSetItem('incrementForPrint', data);
        console.log(response);
        router.push("/increment/print");
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Increment</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="px-4 grid grid-cols-3 gap-4">

                <div className="p-2 overflow-auto">
                    <form onSubmit={createPrintPage}>
                        <div className="w-full grid grid-cols-1 gap-4">
                            <TextEn Title="Income Year" Id="incomeYr" Change={(e) => { setIncomeYr(e.target.value) }} Value={incomeYr} Chr="150" />
                            <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                            <TextDt Title="Active Date" Id="activeDt" Change={(e) => { setActiveDt(e.target.value) }} Value={activeDt} />
                        </div>
                        <BtnSubmit Title="Create Print Page" Class="bg-green-600 hover:bg-green-800 text-white" />
                    </form>
                </div>

                <div className="col-span-2 p-2 overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Refno</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Salary</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                increments.length ? increments.map(increment => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={increment.id}>
                                            <td className="text-center py-2 px-4">{increment.refNo}</td>
                                            <td className="text-center py-2 px-4">{increment.name}</td>
                                            <td className="text-center py-2 px-4">{increment.salary}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={increment.id} data={increments} />
                                                <Delete message={messageHandler} id={increment.id} data={increments} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>




        </>
    );

};

export default Increment;


