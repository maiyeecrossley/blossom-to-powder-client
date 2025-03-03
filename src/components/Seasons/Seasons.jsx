import { Link } from "react-router"

export default function Seasons() {
    const seasons = [
        { id: 6, name: "Spring" },
        { id: 7, name: "Summer" },
        { id: 8, name: "Autumn" },
        { id: 9, name: "Winter" }
    ]


    return (
        <main>
            <h1>Explore Locations by Season</h1>
            
            <ul>
                {seasons.map((season) => (
                    <li key={season.id}>
                        <Link to={`/seasons/${season.id}/locations/`}>
                            {season.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}