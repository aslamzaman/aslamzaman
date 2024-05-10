import React, { useState } from "react";
import { TextEn, BtnSubmit, DropdownEn, TextBn, TextDt, TextNum } from "@/components/Form";
import { fetchData } from "@/lib/utils/FetchData";
const date_format = dt => new Date(dt).toISOString().split('T')[0];




const Edit = ({ message, id, data }) => {
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
    const [show, setShow] = useState(false);



    const [genders, setGenders] = useState([]);
    const [genderIdChange, setGenderIdChange] = useState('');
    const [posts, setPosts] = useState([]);
    const [postIdChange, setPostIdChange] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectIdChange, setProjectIdChange] = useState('');
    const [places, setPlaces] = useState([]);
    const [placeIdChange, setPlaceIdChange] = useState('');
    const [units, setUnits] = useState([]);
    const [unitIdChange, setUnitIdChange] = useState('');




    const showEditForm = async () => {
        setShow(true);
        message("Ready to edit");
        try {

            const [responseGender, responsePost, responseProject, responsePlace, responseUnit] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gender`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/place`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unit`)
            ]);

            const sortPost = responsePost.sort((a, b) => (a.nmEn).toUpperCase() < (b.nmEn).toUpperCase() ? -1 : 1);
            const sortProject = responseProject.sort((a, b) => (a.name).toUpperCase() < (b.name).toUpperCase() ? -1 : 1);
            const sortUnit = responseUnit.sort((a, b) => (a.nmEn).toUpperCase() < (b.nmEn).toUpperCase() ? -1 : 1);
            


            setGenders(responseGender);
            setPosts(sortPost);
            setProjects(sortProject);
            setPlaces(responsePlace);
            setUnits(sortUnit);

            //--------------------------------------------------------------------------

            const { nmEn, nmBn, joinDt, mobile, genderId, postId, projectId, pictureUrl, empId, placeId, unitId, status, remarks } = data.find(staff => staff._id === id) || { nmEn: '', nmBn: '', joinDt: '', mobile: '', genderId: '', postId: '', projectId: '', pictureUrl: '', empId: '', placeId: '', unitId: '', status: '', remarks: '' };


            setNmEn(nmEn);
            setNmBn(nmBn);
            setJoinDt(date_format(joinDt));
            setMobile(mobile);
            setGenderId(genderId._id);
            setPostId(postId._id);
            setProjectId(projectId._id);
            setPictureUrl(pictureUrl);
            setEmpId(empId);
            setPlaceId(placeId._id);
            setUnitId(unitId._id);
            setStatus(status);
            setRemarks(remarks);

            //-----------------------------------
            setGenderIdChange(genderId._id);
            setPostIdChange(postId._id);
            setProjectIdChange(projectId._id);
            setPlaceIdChange(placeId._id);
            setUnitIdChange(unitId._id);

        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready.");
    };


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
            remarks: remarks
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                message("Updated successfully completed");
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


    //-------------------------------------------------
    const genderIdChangeHandler = (e) => {
        const genderIdValue = e.target.value;
        setGenderIdChange(genderIdValue);
        setGenderId(genderIdValue);
    }

    const postIdChangeHandler = (e) => {
        const postIdValue = e.target.value;
        setPostIdChange(postIdValue);
        setPostId(postIdValue);
    }

    const projectIdChangeHandler = (e) => {
        const projectIdValue = e.target.value;
        setProjectIdChange(projectIdValue);
        setProjectId(projectIdValue);
    }

    const placeIdChangeHandler = (e) => {
        const placeIdValue = e.target.value;
        setPlaceIdChange(placeIdValue);
        setPlaceId(placeIdValue);
    }

    const unitIdChangeHandler = (e) => {
        const unitIdValue = e.target.value;
        setUnitIdChange(unitIdValue);
        setUnitId(unitIdValue);
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-9/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-3 gap-4 my-4">
                                    <TextEn Title="Name English" Id="nmEn" Change={e => setNmEn(e.target.value)} Value={nmEn} Chr={50} />
                                    <TextBn Title="Name Bangla" Id="nmBn" Change={e => setNmBn(e.target.value)} Value={nmBn} Chr={50} />
                                    <TextDt Title="Joindt" Id="joinDt" Change={e => setJoinDt(e.target.value)} Value={joinDt} />
                                    <TextEn Title="Mobile" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={50} />

                                    <DropdownEn Title="Gender" Id="genderIdChange" Change={genderIdChangeHandler} Value={genderIdChange}>
                                        {genders.length ? genders.map(gender => <option value={gender._id} key={gender._id}>{gender.name}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Post" Id="postIdChange" Change={postIdChangeHandler} Value={postIdChange}>
                                        {posts.length ? posts.map(post => <option value={post._id} key={post._id}>{post.nmEn}</option>) : null}
                                    </DropdownEn>



                                    <DropdownEn Title="Project" Id="projectIdChange" Change={projectIdChangeHandler} Value={projectIdChange}>
                                        {projects.length ? projects.map(project => <option value={project._id} key={project._id}>{project.name}</option>) : null}
                                    </DropdownEn>

                                    <TextEn Title="Pictureurl" Id="pictureUrl" Change={e => setPictureUrl(e.target.value)} Value={pictureUrl} Chr={50} />
                                    <TextEn Title="Empid" Id="empId" Change={e => setEmpId(e.target.value)} Value={empId} Chr={50} />


                                    <DropdownEn Title="Place" Id="placeIdChange" Change={placeIdChangeHandler} Value={placeIdChange}>
                                        {places.length ? places.map(place => <option value={place._id} key={place._id}>{place.name}</option>) : null}
                                    </DropdownEn>




                                    <DropdownEn Title="Unit" Id="unitIdChange" Change={unitIdChangeHandler} Value={unitIdChange}>
                                        {units.length ? units.map(unit => <option value={unit._id} key={unit._id}>{unit.nmEn}</option>) : null}
                                    </DropdownEn>

                                    <TextNum Title="Status" Id="status" Change={e => setStatus(e.target.value)} Value={status} />
                                    <TextEn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={250} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


