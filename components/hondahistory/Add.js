import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextDt } from "@/components/Form";
import { fetchData } from "@/lib/utils/FetchData";

const Add = ({ message }) => {
    const [hondaId, setHondaId] = useState('');
    const [location, setLocation] = useState('');
    const [projectId, setProjectId] = useState('');
    const [staffId, setStaffId] = useState('');
    const [postId, setPostId] = useState('');
    const [dt, setDt] = useState('');
    const [remarks, setRemarks] = useState('');
    const [picUrl, setPicUrl] = useState('');
    const [pageNo, setPageNo] = useState('');
    const [show, setShow] = useState(false);


    const [hondas, setHondas] = useState([]);
    const [hondaIdChange, setHondaIdChange] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectIdChange, setProjectIdChange] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [staffIdChange, setStaffIdChange] = useState('');
    const [posts, setPosts] = useState([]);
    const [postIdChange, setPostIdChange] = useState('');

    const resetVariables = () => {
        message("Ready to make new additions");
        setHondaId('');
        setLocation('');
        setProjectId('');
        setStaffId('');
        setPostId('');
        setDt('');
        setRemarks('');
        setPicUrl('');
        setPageNo('');
    }


    const showAddForm = async () => {
        setShow(true);
        resetVariables();
        try {
            const [responseHonda, responseProject, responseStaff,responsePost ] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/honda`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
            ]);

            setHondas(responseHonda);
            setProjects(responseProject);
            setStaffs(responseStaff);
            setPosts(responsePost);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const closeAddForm = () => {
        setShow(false);
        message("Data ready");
    }


    const createObject = () => {
        return {
            hondaId: hondaId,
            location: location,
            projectId: projectId,
            staffId: staffId,
            postId: postId,
            dt: dt,
            remarks: remarks,
            picUrl: picUrl,
            pageNo: pageNo
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hondahistory`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Hondahistory is created!");
            } else {
                throw new Error("Failed to create hondahistory");
            }
        } catch (error) {
            console.error("Error saving hondahistory data:", error);
            message("Error saving hondahistory data.");
        } finally {
            setShow(false);
        }
    }


    const hondaIdChangeHandler = (e) => {
        const hondaIdValue = e.target.value;
        setHondaIdChange(hondaIdValue);
        setHondaId(hondaIdValue);
    }

    const projectIdChangeHandler = (e) => {
        const projectIdValue = e.target.value;
        setProjectIdChange(projectIdValue);
        setProjectId(projectIdValue);
    }

    const staffIdChangeHandler = (e) => {
        const staffIdValue = e.target.value;
        setStaffIdChange(staffIdValue);
        setStaffId(staffIdValue);
    }

    const postIdChangeHandler = (e) => {
        const postIdValue = e.target.value;
        setPostIdChange(postIdValue);
        setPostId(postIdValue);
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
                                    <DropdownEn Title="Honda" Id="hondaIdChange" Change={hondaIdChangeHandler} Value={hondaIdChange}>
                                        {hondas.length ? hondas.map(honda => <option value={honda._id} key={honda._id}>{honda.regNo}</option>) : null}
                                    </DropdownEn>



                                    <TextEn Title="Location" Id="location" Change={e => setLocation(e.target.value)} Value={location} Chr={50} />

                                    <DropdownEn Title="Project" Id="projectIdChange" Change={projectIdChangeHandler} Value={projectIdChange}>
                                        {projects.length ? projects.map(project => <option value={project._id} key={project._id}>{project.name}</option>) : null}
                                    </DropdownEn>


                                    <DropdownEn Title="Staff" Id="staffIdChange" Change={staffIdChangeHandler} Value={staffIdChange}>
                                        {staffs.length ? staffs.map(staff => <option value={staff._id} key={staff._id}>{staff.nmEn}-{staff.empId}</option>) : null}
                                    </DropdownEn>


                                    <DropdownEn Title="Post" Id="postIdChange" Change={postIdChangeHandler} Value={postIdChange}>
                                        {posts.length?posts.map(post=><option value={post._id} key={post._id}>{post.nmEn}</option>):null}
                                    </DropdownEn>
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextEn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={50} />
                                    <TextEn Title="Picurl" Id="picUrl" Change={e => setPicUrl(e.target.value)} Value={picUrl} Chr={350} />
                                    <TextEn Title="Page No" Id="pageNo" Change={e => setPageNo(e.target.value)} Value={pageNo} Chr={50} />
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

