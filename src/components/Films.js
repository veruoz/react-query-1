import React, {useState} from 'react';
import {useQuery} from "react-query";
import FilmPage from "./FilmPage";
import {queryClient} from "../App";
import {Link} from "react-router-dom";

const useGetFilms = () => {
    return useQuery(['films'], () => fetch('https://swapi.dev/api/films')
            .then(res => res.json())
            .then(({ results }) => {
                // Оптимизация данных через кеширование
                results.forEach(film => queryClient.setQueryData(['film', film.url], film))
                return results
            }),
        {
            cacheTime: 10000
        })
}

const Films = ({ queryKey }) => {
    const { data } = useGetFilms()
    return (<ul>
                {
                    // Array(30).fill(0).map(()=>
                    data?.map(film => (
                        <li key={film.url}><strong>Film:</strong>
                            <Link to={film.url.replace(/https:\/\/swapi.dev\/api\/films\//g, '')}>
                                {film.title}
                            </Link>
                        </li>
                    // )
                    ))
                }
            </ul>
           )
};

export default Films;
