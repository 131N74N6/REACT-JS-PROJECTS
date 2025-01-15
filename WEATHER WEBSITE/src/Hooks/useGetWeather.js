import { useQuery } from "@tanstack/react-query";
import weatherData from "../Data/weatherData";

export default function useGetWeather(apiLink, errorMessage) {
    return useQuery({
        queryKey: [apiLink],
        queryFn: async () => await weatherData(apiLink, errorMessage),
        staleTime: 1000 * 5,
        cacheTime: 1000 * 60 * 5
    });
}
