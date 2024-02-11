"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/unitsalary/Add";
import Edit from "@/components/unitsalary/Edit";
import Delete from "@/components/unitsalary/Delete";
import { fetchAll } from "@/lib/DexieDatabase";
import { Lib } from "@/lib/Lib";
import Print from "@/components/unitsalary/Print";


const Unitsalary = () => {
    const [unitsalarys, setUnitsalarys] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [totalTaka, setTotalTaka] = useState("0");


    useEffect(() => {
        const load = async () => {
            try {
                const [response, staff, unit] = await Promise.all([
                    fetchAll("unitsalary"),
                    fetchAll("staff"),
                    fetchAll("unit")
                ]);
                const data = response.data;
                const staffData = staff.data;
                const unitData = unit.data;
                // staff joining with unit
                const staffJoining = staffData.map(staff => {
                    const matchUnit = unitData.find(unit => parseInt(unit.id) === parseInt(staff.unit_id));
                    return {
                        ...staff,
                        unit: matchUnit ? matchUnit.nm_en : 'Error!'
                    }
                })

                // unitsalary joining with staff
                const joningData = data.map(unitsalary => {
                    const matchStaff = staffJoining.find(staff => parseInt(staff.id) === parseInt(unitsalary.staff_id));
                    return {
                        ...unitsalary,
                        staff: matchStaff ? matchStaff.nm_en : 'Error!',
                        unit: matchStaff ? matchStaff.unit : 'Error!'
                    }
                })
              //  console.log(joningData)


                const result = joningData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
                setUnitsalarys(result);
                const gt = result.reduce((t, c) => t + (+parseFloat(c.arear) + parseFloat(c.sal1) + parseFloat(c.sal2)), 0);
                setTotalTaka(gt);

            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full my-6 lg:my-10">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Unit Salary = {Lib.util.numberWithCommas(totalTaka)}</h1>
            </div>
            <div className="px-4 lg:px-6">
                <div className="flex justify-between items-center pr-6 lg:pr-7">
                    <div><p className="w-full text-sm text-red-700">{msg}</p></div>
                    <div><Print message={messageHandler} /></div>
                </div>

                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-start border-b border-gray-200 px-4 py-2">Staff Name-Unit</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Arear</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Sal1</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Sal2</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Total</th>
                            <th className="text-center border-b border-gray-200 px-4 py-2">Remarks</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unitsalarys.length ? unitsalarys.map((unitsalary, i) => {
                                let total = parseFloat(unitsalary.arear) + parseFloat(unitsalary.sal1) + parseFloat(unitsalary.sal2);
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={unitsalary.id}>
                                        <td className="text-start py-2 px-4">{i + 1}. {unitsalary.staff}-{unitsalary.unit}</td>
                                        <td className="text-center py-2 px-4">{unitsalary.arear}</td>
                                        <td className="text-center py-2 px-4">{unitsalary.sal1}</td>
                                        <td className="text-center py-2 px-4">{unitsalary.sal2}</td>
                                        <td className="text-center py-2 px-4">{total}</td>
                                        <td className="text-center py-2 px-4">{unitsalary.remarks}</td>
                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={unitsalary.id} />
                                            <Delete message={messageHandler} id={unitsalary.id} />
                                        </td>
                                    </tr>
                                )
                            })
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default Unitsalary;


