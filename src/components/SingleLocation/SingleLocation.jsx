export default function Location({ location }) {
    return (
        <li>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
        </li>
    )
}