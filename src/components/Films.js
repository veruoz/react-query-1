import React, {useState} from 'react';
import {useQuery} from "react-query";
import FilmPage from "./FilmPage";

const useGetFilms = () => {
    return useQuery(['films'], () => fetch('https://swapi.dev/api/films').then(res => res.json()),
        {})
}

const Films = ({ queryKey }) => {
    const [filmURL, setFilmURL] = useState('');
    const { data } = useGetFilms()
    console.log(data);
    return filmURL ? (
                       <>
                           <button onClick={()=> setFilmURL('')}>back</button>
                           <FilmPage url={filmURL}/>
                       </>
                   )
                   : (<ul>
                {
                    data?.results?.map(film => (
                        <li key={film.url}><strong>Film:</strong>
                            <a href="#" onClick={() => setFilmURL(film.url)}>
                                {film.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
           )
};

export default Films;
