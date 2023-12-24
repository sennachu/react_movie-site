import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';

// List of searched movies
const SearchPage = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);

    const getMovie = ()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=652d7557737c971359605b6e2080fac2`)
        .then(res => res.json())
        .then (json => setMovies(json.results))
    }

    useEffect(()=>{
        getMovie()
    },)
    console.log(movies);
    return (
        // Return a list of movies
        <div style={{color:"white"}}>
            <h1>Search Page</h1>
            <ul>
                {movies.map((movie)=>(
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                    </li>
                ))}
            </ul>
        </div>
    );
    }

export default SearchPage;