import React, { useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWVjYjcxNDVlZTNmYjFlNjEwMDkzYTA1OTVmMzY1ZiIsIm5iZiI6MTc1MjQ3NDY5OC4wOCwic3ViIjoiNjg3NGE0NGEyOTEzMDc2NTYzNzA1YTZjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FNSgbujeqnpj9vQjTpI8Su3mxP4CIofxMqr1C6hQK7U'
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();     // prevent vertical scroll behaviour
        cardsRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));  

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className='titleCards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards