import { useEffect, useState } from "react";
import classes from './AddUpdateMovie.module.css'
import InputForm from '../../components/InputForm/InputForm'
import { useNavigate, useParams } from 'react-router-dom'
import MovieService from "../../services/movie";

const AddMovie = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', releaseDate: '', imageUrl: ''});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // si on modifie, on prérempli
    useEffect(() => {
        const getMovie = async () => {
            if (id) {
                setIsLoading(true);
                const movie = await MovieService.getMovieById(id);
                setFormData(movie);
                setIsLoading(false);
            }
        };
        getMovie();
    }, [id]);
    
    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (id) {
            await MovieService.updateMovie(id, formData);
        } else {
            await MovieService.createMovie(formData);
        }
        navigate('/movies');
    };

    if (isLoading) {
        return (
            <div> Chargement </div>
        )
    }

    return (
        <div className={classes['movie-form']}>
            <h1>{id ? 'Edit Movie' : 'Ajouter un film'}</h1>
            <form className={classes['movie-form']} onSubmit={handleSubmit}>
                <InputForm
                    label="Titre"
                    id='title'
                    type='text'
                    required
                    value={formData.title}
                    onChange={handleChange('title')}
                ></InputForm>
                <label htmlFor="description">Description</label>
                <textarea
                    id='description'
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                <InputForm
                    label="Date de sortie"
                    id='releaseDate'
                    type='date'
                    required
                    value={formData.releaseDate}
                    onChange={handleChange('releaseDate')}
                ></InputForm>
            
                <InputForm
                    label="URL de l'image"
                    id='imageUrl'
                    type='url'
                    required
                    value={formData.imageUrl}
                    onChange={handleChange('imageUrl')}
                ></InputForm>
                <button type="submit">{id ? 'Update Movie' : 'Ajouter'}</button>
            </form>
        </div>
        
    )
};
export default AddMovie;