import React, { useEffect, useRef } from 'react'
import Displayhome from './Displayhome'
import { Routes, Route, useLocation } from "react-router-dom"
import DisplayAlbum from './Displayalbum'
import { albumsData } from '../assets/assets'


const Display = () => {

    const displayref = useRef();
    const location = useLocation();    // this lines are used to check the use is in which page this lines are show the user that he is in the 4song or 5th song or 1st song
    const isalbum = location.pathname.includes("album");
    const albumid = isalbum ? location.pathname.slice(-1) : "";

    const bgcolor = albumsData[Number(albumid)].bgColor;// this line is used to confrom the bg color of the page that the user is in that page so that the bgcolor is changed for separate page

    useEffect(() => {
        if (isalbum) {
            displayref.current.style.background = `linear-gradient(${bgcolor},#121212`// this linear gradient is for merge the two into one.
        }
        else {
            displayref.current.style.background = `#121212`        // this line is used to check the user can change the page and also the bg color also change by using this hook where the user is in the album page above code will execute otherwise this else statement will execute

        }
    })
    return (
        <div ref={displayref} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w[75%] lg:ml-0'>

            <Routes>
                <Route path="/" element={<Displayhome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
            </Routes>
        </div>
    )
}

export default Display