import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import { addItem } from "@/lib/utils/LocalDatabase";


const Add = ({ message }) => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [disability, setDisability] = useState('');
    const [disabilityType, setDisabilityType] = useState('');
    const [fatherMotherName, setFatherMotherName] = useState('');
    const [education, setEducation] = useState('');
    const [isMarried, setIsMarried] = useState('');
    const [religion, setReligion] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [village, setVillage] = useState('');

    const [show, setShow] = useState(false);


    const resetVariables = () => {
        setName('');
        setDob('');
        setGender('');
        setDisability('');
        setDisabilityType('');
        setFatherMotherName('');
        setEducation('');
        setIsMarried('');
        setReligion('');
        setPhone('');
        setMobile('');
        setVillage('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            id: Date.now(),
            name: name,
            dob: dob,
            gender: gender,
            disability: disability,
            disabilityType: disabilityType,
            fatherMotherName: fatherMotherName,
            education: education,
            isMarried: isMarried,
            religion: religion,
            phone: phone,
            mobile: mobile,
            village: village
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const response = addItem('logalto', newObject);
            message(response.message);
        } catch (error) {
            console.error("Error saving logalto data:", error);
            message("Error saving logalto data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextDt Title="Dob" Id="dob" Change={e => setDob(e.target.value)} Value={dob} />
                                    <DropdownEn Title="Gender" Id="gender" Change={e => setGender(e.target.value)} Value={gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Disability" Id="disability" Change={e => setDisability(e.target.value)} Value={disability} >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Disabilitytype" Id="disabilityType" Change={e => setDisabilityType(e.target.value)} Value={disabilityType} >
                                        <option value="N/A">N/A</option>
                                        <option value="Physical">Physical</option>
                                        <option value="Hearing">Hearing</option>
                                        <option value="Speech">Speech</option>
                                    </DropdownEn>

                                    <TextEn Title="Father, Nother Name" Id="fatherMotherName" Change={e => setFatherMotherName(e.target.value)} Value={fatherMotherName} Chr={150} />

                                    <DropdownEn Title="Education" Id="education" Change={e => setEducation(e.target.value)} Value={education} >
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">High School</option>
                                        <option value="Post-secondary">Intermediate and Over</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Ismarried" Id="isMarried" Change={e => setIsMarried(e.target.value)} Value={isMarried} >
                                        <option value="Legally married">Married</option>
                                        <option value="Single">Un Married</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Religion" Id="religion" Change={e => setReligion(e.target.value)} Value={religion} >
                                        <option value="Muslim">Muslim</option>
                                        <option value="Hindu">Hindu</option>
                                    </DropdownEn>
                                    <DropdownEn Title="Phone" Id="phone" Change={e => setPhone(e.target.value)} Value={phone} >
                                        <option value="Basic mobile phone">Feature Phone</option>
                                        <option value="Smart phone">Smart phone</option>
                                    </DropdownEn>
                                    <TextEn Title="Mobile Number" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={50} />

                                    <DropdownEn Title="Village" Id="village" Change={e => setVillage(e.target.value)} Value={village} >
                                        <option value="Kanthalia Union Dhakkin desbai">Dhakkin Desbai</option>
                                        <option value="Kanthalia Union Pocchim Khanthalia">Pocchim Khanthalia</option>
                                        <option value="Kanthalia Union Purbo Khanthalia">Purbo Khanthalia</option>
                                        <option value="Kanthalia Union Uttar deshi bai">Uttar deshi bai</option>
                                        <option value="Kapeni Amosi">Kapeni Amosi</option>
                                        <option value="Kapeni Bizimaki 1">Kapeni Bizimaki 1</option>
                                    </DropdownEn>


                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

