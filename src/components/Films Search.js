import React, {useState} from 'react';
import {useQuery} from "react-query";

const useGetFilms = () =>
    useQuery('films', () => {

        // throw new Error('test error')

        return fetch('https://swapi.dev/api/films/').then(res => res.json())
    }, {
        // параметр обновления данных при смене фокуса
        // refetchOnWindowFocus: false
        // параметр при котором данные будут считаться свежими, Infinity
        staleTime: 6000,
        // cash данных в неактивном состоянии
        cacheTime: 6000,
    })

const useGetFilm = ( film ) =>
    useQuery(film, () => {

        // throw new Error('test error')

        return fetch(`https://swapi.dev/api/films?search=${film}`).then(res => res.json())
    }, {

    })
// динамический поиск
const SearchFilm = ({film}) => {
    const { data } = useGetFilm(film)
    console.log(data);
    return <div>{film}</div>
}

const useGetPlanets = () =>
    useQuery('planets', () => {

        // throw new Error('test error')

        return fetch('https://swapi.dev/api/planets/').then(res => res.json())
    }, {
        // параметр обновления данных при смене фокуса
        // refetchOnWindowFocus: false
        // параметр при котором данные будут считаться свежими, Infinity
        staleTime: 6000,
        // cash данных в неактивном состоянии
        cacheTime: 6000,
    })

const FilmsLength = () => {
    const {
        data: { results = [] } = {},
        isLoading,
        isError,
        error,
        isFetching,
        ...otherData
    } = useGetFilms()
    return isLoading ? 'Загрузка...' : (<p>Количество фильмов {results.length}</p>)
}

const Films = ({ queryKey }) => {
    const {
        data: { results = [] } = {},
        isLoading,
        isError,
        error,
        isFetching,
        ...otherData
    } = useGetFilms()
    // console.log(res);
    console.log(otherData);

    const [film, setFilm] = useState();
    return (
        <div>
            <input type='text' value={film} onChange={(e) => setFilm(e.target.value)} />
            <SearchFilm film={film}/>
            <FilmsLength/>
            {isLoading ? 'Загрузка...'
                       : isError ? error.message :
                         results.map(film => (
                             <div key={film.title}>
                                 {film.title}
                             </div>))
            }
            <br/>
            {isFetching ? 'Обновление...' : null}

            <Planets/>
        </div>
    );
};

const Planets = ({ queryKey }) => {
    const {
        data: { results = [] } = {},
        isLoading,
        isError,
        error,
        isFetching,
        ...otherData
    } = useGetPlanets()
    // console.log(res);
    console.log(otherData);
    return (
        <div>
            {isLoading ? 'Загрузка...'
                       : isError ? error.message :
                         results.map(planet => (
                             <div key={planet.name}>
                                 {planet.name}
                             </div>))
            }
            <br/>
            {isFetching ? 'Обновление...' : null}
        </div>
    );
};

export default Films;
