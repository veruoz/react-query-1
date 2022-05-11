import React from 'react';
import {useQuery} from "react-query";

const useGetPlanet = (planetURL) => {
    return useQuery(['planet', planetURL], () => {
        return fetch(planetURL).then(res => res.json(),)
    }, {
        enabled: !!planetURL,
        // данные вывода во время инициализации запроса
        initialData: {
            name: 'initial name'
        }
    })
}

const Planet = ({planetURL}) => {
    const {data, isLoading} = useGetPlanet(planetURL)
    return (
        <div>
            Planets: {isLoading ? '...' : data.name}
        </div>
    );
};

export default Planet;
