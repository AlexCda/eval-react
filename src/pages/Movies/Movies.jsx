import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { MovieService } from '../../services/movie';
import classes from './Movies.module.css'
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const movieService = new MovieService()
            const allMovies = await movieService.getAllMovies()
            setMovies(allMovies)
        };
        getMovies();
    }, [])
    
    return (
        <div className={classes['movies-page']}>
            <h1>Films</h1>
            <div className={classes['movies-grid']}>
                {movies.map(movie => (
                    <Link key={movie.id} to={`/movies/${movie.id}`} className={classes['movie-link']}>
                        <MovieCard movie={movie}/>
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default Movies;