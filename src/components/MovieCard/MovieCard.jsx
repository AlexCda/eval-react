import classes from './MovieCard.module.css'
const MovieCard = ({movie}) => {
    return (
        <div className={classes['movie-card']}>
            <img src={movie.imageUrl} alt={movie.title}></img>
            <div className={classes['movie-card-content']}>
                <h2>{movie.title}</h2>
                <p>{movie.releaseDate}</p>
            </div>
        </div>
    )
}

export default MovieCard;