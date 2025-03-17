import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { MovieService } from '../../services/movie';
import { AuthContext } from "../../context/AuthContext"
import classes from './MovieDetails.module.css'
const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getMovie = async () => {
            const movieService = new MovieService()
            const findMovie = await movieService.getMovieById(id);
            setMovie(findMovie)
            setIsLoading(false)
        };
        getMovie();
    }, [id])

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            const movieService = new MovieService();
            await movieService.deleteMovie(id);
            navigate('/movies');
        }
    };

    const handleEdit = () => {
        navigate(`/movies/${id}/edit`)
    }

    if (isLoading) {
        return (
            <div> Chargement </div>
        )
    }
    return (
        <div className={classes['movie-details']}>
            <div className={classes['movie-header']}>
                <h1>{movie.title}</h1>
                {currentUser ? (<div className={classes['movie-actions']}>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>) : ('')}
            </div>
            <div className={classes['movie-content']}>
                <img src={movie.imageUrl} alt={movie.title} />
                <div className={classes['movie-info']}>
                    <p className={classes['release-date']}>Date de sortie : {movie.releaseDate}</p>
                    <p className={classes.description}>{movie.description}</p>
                </div>
            </div>
        </div>
    )
}
export default MovieDetails;