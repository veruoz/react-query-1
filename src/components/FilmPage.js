import React from 'react';
import {useQuery} from "react-query";
import {queryClient} from "../App";

const useGetFilm = (url) => {
    return useQuery(['film', url], () =>
            new Promise(resolve => setTimeout(resolve, 2000)).then(() => fetch(url).then(res => res.json())),
        {
            // использовать данные для предзагрузки
            initialData: queryClient.getQueryData('films')?.results?.find(film => film.url === url)
        })
}

const FilmPage = ({ url }) => {
    const { data, isLoading, isFetching } = useGetFilm(url)
    return isLoading ? (
        <div>Loading...</div>
    ) : (
               <>
                   <div>
                       <h1>{data?.title}</h1>
                       <p>
            <span>
            <strong>episode:</strong> {data?.episode_id}
            </span>
                       </p>
                       <strong>
                           description
                       </strong>
                       <p>{data?.opening_crawl}</p>
                   </div>
                   {isFetching ? 'Updating' : null}
               </>
           );
};

export default FilmPage;
