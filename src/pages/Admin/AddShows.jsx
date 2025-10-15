import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { kConverter } from '../../libraries/KConverter';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from 'react-icons/md';

const AddShows = () => {
    const currency=import.meta.env.VITE_CURRENCY
    const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
    const[selectedMovie,setSelectedMovie]=useState(null);
    const [dateTimeSelection,setDateTimeSelection]=useState({});
    const [dateTimeInput,setDateTimeInput]=useState("");
    const[showPrice,setShowPrice]=useState("");

    const fetchNowPlayingMovies=async()=>{
        setNowPlayingMovies(dummyShowsData)
    }

    const handleDateTimeAdd=()=>{
        if(!dateTimeInput) return;
        const [date,time]=dateTimeInput.split("T")
        if(!date || time) return;
        setDateTimeSelection((prev)=>{

            const times=prev[date] || [];
            if(!times.includes(time)){
                return {...prev,[date]:[...times,time]}
            }
            return prev;
        })
    }


    useEffect(()=>{
    fetchNowPlayingMovies();
    },[])

    return nowPlayingMovies.length>0 ?(
        <>
            <h1>Add shows</h1>
            <div>
            <p>Now palying movies</p>
            <div>
                {nowPlayingMovies.map((movie)=>(
                    <div key={movie.id} onClick={()=>setSelectedMovie(movie.id)} >
                        <div>
                            <img src={movie.poster_path} alt="" />
                        <div>
                            <p>{movie.vote_average.toFixed(1)}</p>
                             <p>{ kConverter(movie.vote_count)}</p>
                        </div>
                        </div>
                        {selectedMovie === movie.id && (
                            <div>
                            <IoIosCheckmarkCircleOutline />
                            </div>
                        )}
                        <p>{movie.title} </p>
                        <p> {movie.release_date} </p>
                        
                    </div>
                ))}
            </div>


            </div>

        {/* show price input */}
        <div>
            <label>show Price</label>
            <div>
                <p>{currency}</p>
                <input type="number" value={showPrice} onChange={(e)=>setShowPrice(e.target.value) } placeholder='Enter show price'/>
            </div>
        </div>
        {/* Date and time */}
        <div>
            <label> select Date and Time</label>
            <div>
                <input type="datetime-local" value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} />
                <button onClick={handleDateTimeAdd}>Add Time</button>
            </div>
        </div>
        {/* Display selected times */}

        {
            Object.keys(dateTimeSelection).length>0 && (
                <div>
                    <h2>Selected Date-Time</h2>
                    <ul>
                        {
                            Object.entries(dateTimeSelection).map(([date,times])=>{
                                <li key={date}>
                                    <div>{date}</div>
                                    <div>
                                        {
                                            times.map((time)=>(
                                                <div key={time}>
                                                    <span>{time}</span>
                                                    <MdDelete
                                                    onClick={()=>handleRemoveTime(date,time)}
                                                    ></MdDelete>
                                                 </div>
                                            ))
                                        }
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        <button> Add SHow</button>        

</>
    ):(<Loading></Loading>)
};

export default AddShows;