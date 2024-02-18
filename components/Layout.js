"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchAll, backup, recover } from '@/lib/DexieDatabase';
import { saveAs } from "file-saver";
import { Data } from "@/lib/Data";
import { MenuData } from '@/lib/MenuData';




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
        <>
            {/* nav bar fixed menu, aslam, bar, close */}
            <header className="fixed w-full h-[60px] top-0 px-4 lg:px-6 bg-gray-50 border-b-2 border-gray-200 flex justify-between items-center shadow-lg z-20">
                <div className="text-lg font-bold">
                    {menu ? (<h1>Menu</h1>) : (<Link href="/">Aslam</Link>)}
                </div>
                <button onClick={() => menu ? setMenu(false) : setMenu(true)}>
                    {menu ?
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>)

                        : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                </button>
            </header>


            {/* content */}
            <main className="w-full mt-[60px] bg-white overflow-auto">
                {children}
            </main>


            {/* footer */}
            <footer className="w-full py-10 text-center text-sm bg-gray-50 border-t-2 border-gray-200">
                <p className='text-center'>Copyright @ 2023 Aslam Zaman. Email: aslamcmes@gmail.com</p>
            </footer>

            {
                menu && (
                    <>
                        <nav className="fixed w-full max-h-[calc(100vh-60px)] top-[60px] overflow-auto z-20">
                            <div className='w-full p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 bg-gray-400 shadow-lg transition duration-500'>

                                {
                                    MenuData.map((m, i) => {
                                        const btn = m.group;
                                        return (
                                            <MenuWraper Title={m.title} key={i}>
                                                {btn.map((b, j) => <MenuItem Click={() => setMenu(false)} Href={b.url} Title={b.label} key={j} />)}
                                            </MenuWraper>
                                        )
                                    })
                                }



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


                            </div>

                        </nav>
                    </>
                )
            }


        </>
    )
}

export default Layout



