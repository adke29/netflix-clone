import React, { useEffect, useState } from 'react'
import "./css/Banner.css"
import axios from './axios';
import requests from './Requests';

function Banner() {
    const [movie,setMovie] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random()*request.data.results.length -1)
            ])
        }
        fetchData();
    },[])

    function truncate(string,n){
        return string?.length >n ? string.substring(0,n-1) + "...":string;
    }
  return (
    <header className='banner' style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize:"cover",
        backgroundPosition:"top center"
    }}>
        <div className="banner_contents">
            <h1 className="banner_title">{movie?.title||movie?.name||movie?.original_name}</h1>
            <div className="banner_buttons">
                <button className='banner_btn'>Play</button>
                <button className='banner_btn'>My List</button>
            </div>
            <h1 className="banner_description">{truncate(movie.overview,150)}</h1>

        </div>

        <div className="banner-fadeBottom"/>



    </header>
  )
}

export default Banner