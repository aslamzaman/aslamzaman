import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextBn, TextDt, TextNum } from "@/components/Form";
import { fetchData } from "@/lib/utils/FetchData";
const date_format = dt => new Date(dt).toISOString().split('T')[0];


const Add = ({ message }) => {
    const [nmEn, setNmEn] = useState('');
    const [nmBn, setNmBn] = useState('');
    const [joinDt, setJoinDt] = useState('');
    const [mobile, setMobile] = useState('');
    const [genderId, setGenderId] = useState('');
    const [postId, setPostId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [empId, setEmpId] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [unitId, setUnitId] = useState('');
    const [status, setStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [salary, setSalary] = useState('');

    const [show, setShow] = useState(false);

    const [genders, setGenders] = useState([]);
    const [posts, setPosts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [places, setPlaces] = useState([]);
    const [units, setUnits] = useState([]);

    const resetVariables = () => {
        setNmEn('');
        setNmBn('');
        setJoinDt(date_format(new Date()));
        setMobile('');
        setGenderId('');
        setPostId('');
        setProjectId('');
        setPictureUrl('');
        setEmpId('');
        setPlaceId('');
        setUnitId('');
        setStatus('');
        setRemarks('');
        setSalary('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const [responseGender, responsePost, responseProject, responsePlace, responseUnit] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gender`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/place`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unit`)
            ]);
            setGenders(responseGender);
            setPosts(responsePost);
            setProjects(responseProject);
            setPlaces(responsePlace);
            setUnits(responseUnit);
        } catch (error) {
            console.error('Failed to fetch delivery data:', error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            nmEn: nmEn,
            nmBn: nmBn,
            joinDt: joinDt,
            mobile: mobile,
            genderId: genderId,
            postId: postId,
            projectId: projectId,
            pictureUrl: pictureUrl,
            empId: empId,
            placeId: placeId,
            unitId: unitId,
            status: status,
            remarks: remarks,
            salary: salary
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message(`Staff is created at ${new Date().toISOString()}`);
            } else {
                throw new Error("Failed to create staff");
            }
        } catch (error) {
            console.error("Error saving staff data:", error);
            message("Error saving staff data.");
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
                                    <TextEn Title="Name (English)" Id="nmEn" Change={e => setNmEn(e.target.value)} Value={nmEn} Chr={50} />
                                    <TextBn Title="Name (Bangla)" Id="nmBn" Change={e => setNmBn(e.target.value)} Value={nmBn} Chr={50} />
                                    <TextDt Title="Joining Date" Id="joinDt" Change={e => setJoinDt(e.target.value)} Value={joinDt} />
                                    <TextEn Title="Mobile" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={50} />
                                    <DropdownEn Title="Gender" Id="genderId" Change={e => setGenderId(e.target.value)} Value={genderId}>
                                        {genders.length ? genders.map(gender => <option value={gender._id} key={gender._id}>{gender.name}</option>) : null}
                                    </DropdownEn>
                                    <DropdownEn Title="Post" Id="postId" Change={e => setPostId(e.target.value)} Value={postId}>
                                        {posts.length ? posts.map(post => <option value={post._id} key={post._id}>{post.nmEn}</option>) : null}
                                    </DropdownEn>


                                    <DropdownEn Title="Project" Id="projectId" Change={e => setProjectId(e.target.value)} Value={projectId}>
                                        {projects.length ? projects.map(project => <option value={project._id} key={project._id}>{project.name}</option>) : null}
                                    </DropdownEn>
                                    <TextEn Title="Picture Url" Id="pictureUrl" Change={e => setPictureUrl(e.target.value)} Value={pictureUrl} Chr={250} />
                                    <TextEn Title="Employee Id" Id="empId" Change={e => setEmpId(e.target.value)} Value={empId} Chr={50} />

                                    <DropdownEn Title="Place" Id="placeId" Change={e => setPlaceId(e.target.value)} Value={placeId}>
                                        {places.length ? places.map(place => <option value={place._id} key={place._id}>{place.name}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Unit" Id="unitId" Change={e => setUnitId(e.target.value)} Value={unitId}>
                                        {units.length ? units.map(unit => <option value={unit._id} key={unit._id}>{unit.nmEn}</option>) : null}
                                    </DropdownEn>
                                    <TextNum Title="Status" Id="status" Change={e => setStatus(e.target.value)} Value={status} />
                                    <TextNum Title="Salary" Id="salary" Change={e => setSalary(e.target.value)} Value={salary} />
                                    <TextEn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={250} />
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

