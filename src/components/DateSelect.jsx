import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const DateSelect = ({dateTime,id}) => {
    const [selected,setSelected]=useState(null)
    const navigate=useNavigate();
    const onBookHandler=()=>{
        if(!selected){
            return toast('please select date !')
        }
        navigate(`/movies/${id}/${selected}`)


    }
    return (
        <div id='dateSelect' >
            <div>
                <p>Choose date</p>
                <div className='flex items-center gap-6 text-sm mt-5'>
             
                      <MdKeyboardArrowLeft />
                     <span  className='grid grid-cols-3 md:flex flex-wrep md:max-w-lg'>
                       {Object.keys(dateTime).map((date)=>(
                        <button onClick={()=>setSelected(date)} key={date} className={`felx flex-col items-center jusify-center h-14 w-14 aspect-square rounded cursor-pointer
                        ${selected == date ? 'bg-red-500 text-white':"border border-red-500"}
                        `} >
                                <span> {new Date(date).getDate()}</span>
                                <span> {new Date(date).toLocaleDateString("en-Us",{month:"short"})}</span>
                        </button>
                       ))}
                     </span>
                    <MdArrowForwardIos />
                </div>
            </div>
            <button
            onClick={onBookHandler}
            className='p-2 bg-red-500 rounded'>Book Now</button>
            
        </div>
    );
};

export default DateSelect;