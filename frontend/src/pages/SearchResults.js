
import Properties from "../components/Properties"
import { useLoaderData } from "react-router-dom";

export default function SearchResults() {
    const data = useLoaderData();
    return (
        <Properties data={data} />
    )
}
