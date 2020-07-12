import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMoveImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            setMovies([response.results])

            setMainMovieImage(response.results[0])

        })
        
    }, [])


    return (
        <div style={{ width: '100%', margin: '0' }}>

            {MainMoveImage &&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMoveImage.backdrop_path}`}
                title={MainMoveImage.original_title}
                text={MainMoveImage.overview}
                />
            }

        </div>
    )
}

export default LandingPage
