"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/staff/Add";
import Edit from "@/components/staff/Edit";
import Delete from "@/components/staff/Delete";
import { fetchAll } from "@/lib/DexieDatabase";


const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const load = async () => {
            try {
                const [staff, post, gender, project, unit, place] = await Promise.all([
                    fetchAll("staff"),
                    fetchAll("post"),
                    fetchAll("gender"),
                    fetchAll("project"),
                    fetchAll("unit"),
                    fetchAll("place"),

                ]);

                const staffData = staff.data;
                const postData = post.data;
                const genderData = gender.data;
                const projectData = project.data;
                const unitData = unit.data;
                const placeData = place.data;

                const data = staffData.map(s => {
                    const matchPost = postData.find(post => parseInt(post.id) === parseInt(s.post_id));
                    const matchGender = genderData.find(gender => parseInt(gender.id) === parseInt(s.gender_id));
                    const matchProject = projectData.find(project => parseInt(project.id) === parseInt(s.project_id));
                    const matchUnit = unitData.find(unit => parseInt(unit.id) === parseInt(s.unit_id));
                    const matchPlace = placeData.find(place => parseInt(place.id) === parseInt(s.place_id));
                    return {
                        ...s,
                        post: matchPost ? matchPost.nm_en : "Error!",
                        gender: matchGender ? matchGender.name : "Error!",
                        project: matchProject ? matchProject.name : "Error!",
                        unit: matchUnit ? matchUnit.nm_en : "Error!",
                        place: matchPlace ? matchPlace.name : "Error!",
                    }
                })
                console.log(data)

                const result = data.sort((a, b) => parseInt(a.emp_id) - parseInt(b.emp_id));
                setStaffs(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Staff</h1>
            </div>
            <div className="px-4 lg:px-6">
                <p className="w-full text-sm text-red-700">{msg}</p>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-2">Picture</th>
                            <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                            <th className="font-normal text-start flex justify-end mt-1 pr-[3px] lg:pr-2">
                                <Add message={messageHandler} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs.length ? staffs.map(staff => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={staff.id}>
                                        <td className="text-center py-2 px-4">
                                            <div className="w-[75px] h-[100px] p-1 border-2">
                                            <img className="w-full h-full" src={`/images/staffs/${staff.picture_id}.jpg`} alt={`${staff.nm_en}`} />
                                            </div>
                                        </td>
                                        <td className="text-start py-2 px-4">
                                            <span className="font-bold">{staff.emp_id}</span><br />
                                            {staff.nm_en} (<span className="font-sutonny-n">{staff.nm_bn}</span>)<br />
                                            {staff.post} [{staff.gender}]<br />
                                            {staff.dt}-[{staff.sal}]<br />
                                            {staff.place}-{staff.unit}, {staff.project}<br />
                                            Mobile: {staff.mobile}<br />
                                            <span className="text-xs text-gray-500">{staff.remarks}</span>
                                        </td>







                                        <td className="flex justify-end items-center mt-1">
                                            <Edit message={messageHandler} id={staff.id} />
                                            <Delete message={messageHandler} id={staff.id} />
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

export default Staff;


