import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Section/MainImage';

function LandingPage() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
                                                                            // en-US
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${page}`
        fetch(endPoint)
        .then(res => res.json())
        .then(res => {
            setMovies([res.results])
            setTotalPages(res.total_pages)
            setMainMovieImage(res.results[0])
        })
    }, [])
    return (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main Image */}
            {mainMovieImage &&  // 값이 있을 때 렌더링하도록
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                title={mainMovieImage.title}    // 원제: original_title
                text={mainMovieImage.overview}
                 />
            }

            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>by latest</h2>
                <hr />
                <h3>total_pages: {totalPages}</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
