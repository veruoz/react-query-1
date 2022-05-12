import React from 'react';
import {useQuery} from "react-query";

const useGetFilm = (url) => {
    return useQuery(['film', url], () => fetch(url).then(res => res.json()),
        {})
}

const FilmPage = ({ url }) => {
    const { data } = useGetFilm(url)
    return (
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
    );
};

export default FilmPage;
