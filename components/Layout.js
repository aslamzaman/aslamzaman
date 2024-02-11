"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchAll, backup, recover } from '@/lib/DexieDatabase';
import { saveAs } from "file-saver";
import { Data } from "@/lib/Data";


const MenuWraper = ({ Title, children }) => {
    return <div className="flex flex-col p-2 md:p-4 items-center bg-gradient-to-t from-white to-pink-100 rounded-lg">
        <h1 className='w-full text-start text-xs font-bold text-gray-500 italic'>{Title}</h1>
        <div className="flex flex-col items-start">
            {children}
        </div>
    </div>
}


const MenuItem = ({ Click, Href, Title }) => {
    const router = useRouter();
    const cmdClick = () => {
        Click();
        router.push(Href);
    }
    return (
        <button onClick={cmdClick} className="px-1 mb-2 hover:border-l-2 border-indigo-400 underline-offset-4 decoration-4 decoration-indigo-300 hover:text-indigo-400">{Title}</button>
    )
}




const Layout = ({ children }) => {
    const [dataExists, setDataExists] = useState(false);
    const [menu, setMenu] = useState(false);
    const [msg, setMsg] = useState("");


    useEffect(() => {
        /*
                let log = sessionStorage.getItem("login");
                if (log === "login") {
                    setUser(true);
                } else {
                    setUser(false);
                }
        */
        const dataCheck = async () => {
            try {
                const districtData = await fetchAll("district");
                //  console.log(districtData.data)
                districtData.data.length > 0 ? setDataExists(true) : setDataExists(false);
                setMsg("Data exists.");
            }
            catch (err) {
                console.log(err);
                setMsg("No data found.");
            }

        }
        dataCheck();


    }, [msg])




    const backupHandler = async () => {
        try {
            const data = await backup();
            const json = JSON.stringify(data);
            const blob = new Blob([json], { type: "application/json" });
            const fileName = `${new Date().toISOString()}-dexie-db.json`;
            saveAs(blob, fileName);
            console.log(`Downloaded database as "${fileName}"`);
        } catch (error) {
            console.error("Error downloading JSON file:", error);
            throw error;
        }
    }


    const initDBHandler = async () => {
        try {
            const staff_data = await fetchAll("staff");
            if (staff_data.length > 0) {
                console.log("Data already exists.");
                setMsg("Data available.");
                return false;
            } else {
                await recover(Data);
                console.log("Data restore successfully completed.");
                setMsg("Data restore successfully completed..");
            }
        } catch (error) {
            console.error('Error occurred during database recovery:', error)
        }
    }



    return (
        <div className="relative w-screen h-screen">
            <div className="w-full h-[60px] px-4 lg:p-6 bg-gray-50 border-b-2 border-gray-200 flex justify-between items-center shadow-lg">
                <div className="text-lg font-bold">
                    {menu ? (<h1>Menu</h1>) : (<Link href="/">Aslam</Link>)}
                </div>
                <div className="flex items-center space-x-3">
                    {menu
                        ? (<button onClick={() => setMenu(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>)
                        : (<button onClick={() => setMenu(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>)}
                </div>
            </div>

            <div className="w-full h-[calc(100vh-110px)] bg-white overflow-auto">
                <div className="w-full h-full">
                    {children}
                    <div className='h-20'></div>
                </div>
            </div>

            <footer className="w-full h-[50px] px-4 lg:px-6 flex justify-center items-center text-sm bg-gray-50 border-t-2 border-gray-200">
                <p className='text-center'>Copyright @ 2023 Aslam Zaman. Email: aslamcmes@gmail.com</p>
            </footer>

            {menu && (
                <div id="menuGroup" className="absolute w-full top-[60px] p-4 grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-2 md:gap-3 bg-gray-400 shadow-lg transition duration-300">

                    <MenuWraper Title="Settings">
                        <MenuItem Click={() => setMenu(false)} Href="/project" Title="Project" />
                        <MenuItem Click={() => setMenu(false)} Href="/post" Title="Post" />
                        <MenuItem Click={() => setMenu(false)} Href="/staff" Title="Staff" />
                        <MenuItem Click={() => setMenu(false)} Href="/gender" Title="Gender" />
                        <MenuItem Click={() => setMenu(false)} Href="/place" Title="Place" />
                        <MenuItem Click={() => setMenu(false)} Href="/unit" Title="Unit" />
                        <MenuItem Click={() => setMenu(false)} Href="/author" Title="Author" />
                    </MenuWraper>

                    <MenuWraper Title="Calculation">
                        <MenuItem Click={() => setMenu(false)} Href="/octen" Title="Octen" />
                        <MenuItem Click={() => setMenu(false)} Href="/code" Title="Code" />
                        <MenuItem Click={() => setMenu(false)} Href="/construction" Title="Construction Works" />
                        <MenuItem Click={() => setMenu(false)} Href="/vattax" Title="VAT & TAX" />
                        <MenuItem Click={() => setMenu(false)} Href="/benefit" Title="Staff Benefit" />
                        <MenuItem Click={() => setMenu(false)} Href="/landareaconverter" Title="Land Area Converter" />
                    </MenuWraper>


                    <MenuWraper Title="Backup/Restore">
                        {dataExists ? (
                            <>
                                <MenuItem Click={() => setMenu(false)} Href="/restore" Title="Database Restore" />
                                <button onClick={backupHandler} className="px-1 mb-2 hover:border-l-2 border-indigo-400 underline-offset-4 decoration-4 decoration-indigo-300 hover:text-indigo-400">Backup</button>
                            </>
                        ) : (

                            <input type="button" onClick={initDBHandler} className="px-1 mb-2 hover:border-l-2 border-indigo-400 underline-offset-4 decoration-4 decoration-indigo-300 hover:text-indigo-800 cursor-pointer" value="Database Initialize" />

                        )}
                    </MenuWraper>




                    <MenuWraper Title="Bayprostab">
                        <MenuItem Click={() => setMenu(false)} Href="/bayprostab" Title="Bayprostab" />
                        <MenuItem Click={() => setMenu(false)} Href="/bayprostabexecution" Title="Bayprostab Execution" />
                        <MenuItem Click={() => setMenu(false)} Href="/unitsalary" Title="Unitsalary" />
                        <MenuItem Click={() => setMenu(false)} Href="/rent" Title="House Rent" />
                        <MenuItem Click={() => setMenu(false)} Href="/sewerage" Title="Sewerage" />
                    </MenuWraper>


                    <MenuWraper Title="Documents">
                        <MenuItem Click={() => setMenu(false)} Href="/doc" Title="Doc" />
                        <MenuItem Click={() => setMenu(false)} Href="/mobile" Title="Mobile" />
                        <MenuItem Click={() => setMenu(false)} Href="/ta" Title="Ta" />
                        <MenuItem Click={() => setMenu(false)} Href="/da" Title="Da" />
                        <MenuItem Click={() => setMenu(false)} Href="/price" Title="Price" />
                    </MenuWraper>

                    <MenuWraper Title="Bills">
                        <MenuItem Click={() => setMenu(false)} Href="/bkash" Title="Bkash" />
                        <MenuItem Click={() => setMenu(false)} Href="/electrickbill" Title="Electrick Bill" />
                        <MenuItem Click={() => setMenu(false)} Href="/tabill" Title="TA Bill" />
                        <MenuItem Click={() => setMenu(false)} Href="/localta" Title="Local TA" />
                        <MenuItem Click={() => setMenu(false)} Href="/mobilebill" Title="Mobile Bill" />
                    </MenuWraper>



                </div>
            )}

        </div >
    )
}

export default Layout



