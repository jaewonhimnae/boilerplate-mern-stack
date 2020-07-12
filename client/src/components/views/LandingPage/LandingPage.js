import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCards'
import {Row} from 'antd'

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMoveImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results)
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {MainMoveImage &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMoveImage.backdrop_path}`}
                    title={MainMoveImage.original_title}
                    text={MainMoveImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

            <Row gutter={[16, 16]}>
            
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>             
                        <GridCard
                            image={movie.poster_path ?
                                `${IMAGE_BASE_URL}w500${movie.poster_path}`
                                : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />

                    </React.Fragment>   
                ))}
            </Row>
            
            
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
