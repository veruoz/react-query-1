import React, {useReducer} from 'react';
import {useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {queryClient} from "../App";

const FilmPage = () => {
    const { filmId } = useParams()
    const navigate = useNavigate()
    const [count, increment] = useReducer(c => c + 1, 0);

    const url = `https://swapi.dev/api/films/${filmId}/`

    const { data, isLoading, isFetching } = useQuery(['film', url], () =>
            new Promise(resolve => setTimeout(resolve, 2000)).then(() => fetch(url).then(res => res.json())),
        {
            onSuccess: data => {
                increment()
            },
            onError:   error => {
            },
            onSettled: (data, error) => {
            }
        })
    return isLoading ? (
        <div>Loading...</div>
    ) : (
               <>
                   <button onClick={() => navigate.goBack()}>back</button>
                   <div>
                       <h1>{data.title}</h1>
                       <h2>episode:</h2> {data.episode_id}
                       <strong>
                           description
                       </strong>
                       <p>{data.opening_crawl}</p>
                   </div>
                   <button onClick={()=>queryClient.invalidateQueries(['film', url])}>Обновить данные</button>
                   {
                       isFetching ? `Updating ... #${count}` : null
                   }
               </>
           );
};

export default FilmPage;
