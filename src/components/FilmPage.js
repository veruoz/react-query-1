import React, {useReducer} from 'react';
import {useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {queryClient} from "../App";

const FilmPageWrapper = () => {
    const { filmId } = useParams()
    const url = `https://swapi.dev/api/films/${filmId}/`
    const [isShow, toggle] = useReducer(isShow => !isShow, true)
    return (<>
        <button onClick={toggle}>Переключить видимость</button>
        <button onClick={()=>queryClient.invalidateQueries(['film', url], {refetchInactive: true})}>Обновить данные в inactive</button>
        {isShow ? <FilmPage /> : null}
    </>)
}
const FilmPage = () => {
    const { filmId } = useParams()
    const navigate = useNavigate()
    const [count, increment] = useReducer(c => c + 1, 0);

    const url = `https://swapi.dev/api/films/${filmId}/`

    const { data, isLoading, isFetching } = useQuery(['film', url], () =>
            new Promise(resolve => setTimeout(resolve, 2000)).then(() => fetch(url).then(res => res.json())),
        {
            staleTime: Infinity,
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
                   <button onClick={() => navigate('/')}>back</button>
                   <div>
                       <h1>{data.title}</h1>
                       <h2>episode:</h2> {data.episode_id}
                       <strong>
                           description
                       </strong>
                       <p>{data.opening_crawl}</p>
                   </div>
                   <button onClick={()=>queryClient.invalidateQueries(['film', url])}>Обновить данные</button>
                   <button onClick={()=>queryClient.invalidateQueries(['film', url], {refetchActive: false})}>Сделать данные старыми</button>
                   {
                       isFetching ? `Updating ... #${count}` : null
                   }
               </>
           );
};

export default FilmPageWrapper;
