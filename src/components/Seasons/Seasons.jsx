import { Link } from "react-router"
import { useState, useEffect } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { seasonIndex } from "../../services/seasonsService"

import styles from "./Seasons.module.css"

export default function Seasons() {
    const [seasons, setSeasons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterByMonth, setFilterByMonth] = useState(false);

    useEffect(() => {
        const startMonth = filterByMonth ? 3 : null;
        const endMonth = filterByMonth ? 5 : null;

        seasonIndex(startMonth, endMonth)
            .then(data => {
                setSeasons(data.seasons || [])
            })
            .catch(error => {
                console.error("Error fetching seasons:", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [filterByMonth])

    const seasonClassNames = {
        6: styles.springCard,
        7: styles.summerCard,
        8: styles.autumnCard,
        9: styles.winterCard
    }

    return (
        <main>
            <h1>Explore Locations by Season</h1>

            <Container>
                {isLoading 
                ? <p>Loading seasons...</p>
                : <Row>
                    {seasons.map((season) => (
                        // <Col key={season.id} xs={12} sm={6} md={3}>
                        <Card className={`${styles.seasonCard} ${seasonClassNames[season.id] || ""}`}>
                            <Card.Body className={styles.cardBody}>
                                    <Link to={`/seasons/${season.id}/locations/`} className={styles.seasonLink}>
                                <Card.Title className={styles.seasonTitle}>{season.name}</Card.Title>
                                    <Card.Text className={styles.seasonDescription}>
                                            {season.description || "No description available."}
                                    </Card.Text>
                                        <p>View Locations</p>
                                    </Link>
                            </Card.Body>
                        </Card>
                        // </Col>
                    ))}
                </Row>
            }
            </Container>
        </main>
    )
}