import { Link } from "react-router"
import { useState, useEffect } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { seasonIndex } from "../../services/seasonsService"

import styles from "./Seasons.module.css"

export default function Seasons() {
    const [seasons, setSeasons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterByMonth, setFilterByMonth] = useState(false)
    const [expandedSeasons, setExpandedSeasons] = useState({})

    useEffect(() => {
        const startMonth = filterByMonth ? 3 : null
        const endMonth = filterByMonth ? 5 : null

        seasonIndex(startMonth, endMonth)
            .then(data => {
                setSeasons(data.seasons || [])
            })
            .catch(error => {
                console.error("Error fetching seasons:", error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [filterByMonth])

    const toggleReadMore = (seasonId) => {
        setExpandedSeasons((prev) => ({ ...prev, [seasonId]: !prev[seasonId] }))
    }

    const seasonImages = {
        6: "https://i.pinimg.com/736x/35/d9/13/35d9139d6ae9e50a78c2338c0069d1bb.jpg", //spring
        7: "https://i.pinimg.com/736x/40/f3/8d/40f38dadb3e7054c99de7b0debf11aae.jpg", //summer
        8: "https://i.pinimg.com/736x/9f/b6/a8/9fb6a8b560ce854ac37438373f0e78d1.jpg", //autumn
        9: "https://i.pinimg.com/736x/73/62/48/736248125d0ceeedef7a2e492e08645b.jpg" //winter
    }

    return (
        <main className={styles.seasonMain}>
            <h1>Explore Locations by Season</h1>

            <Container>
                {isLoading
                    ? <p>Loading seasons...</p>
                    : <Row>
                        {seasons.map((season) => (
                            <Col key={season.id} xs={12} sm={6} md={4} lg={3}>

                                <Card className={styles.seasonCard}>
                                    <Card.Img 
                                        variant="top" 
                                        src={seasonImages[season.id]} 
                                        alt={season.name} 
                                        className={styles.seasonImage} 
                                    />
                                    <Card.Body className={styles.cardBody}>
                                        <Card.Title className={styles.seasonTitle}>{season.name}</Card.Title>
                                        <Card.Text className={`${styles.seasonDescription} ${expandedSeasons[season.id] ? styles.expandedDescription : ""}`}>
                                            {season.description}
                                        </Card.Text>

                                        {season.description?.length > 120 && (
                                            <button
                                                className={styles.readMoreButton}
                                                onClick={() => toggleReadMore(season.id)}>
                                                {expandedSeasons[season.id] ? "Show Less" : "Read more..."}
                                            </button>
                                        )}
                                    </Card.Body>
                                    <Link to={`/seasons/${season.id}/locations/`} className={styles.seasonLink}>
                                        <p>View Locations</p>
                                    </Link>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                }
            </Container>
        </main>
    )
}