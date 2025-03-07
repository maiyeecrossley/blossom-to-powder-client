import styles from "./Home.module.css"
import Seasons from "../Seasons/Seasons"

export default function Home() {
    return (
        <main className={styles.homeContainer}>
            <section className={styles.heroSection}>
                <h1>Welcome to Blossom to Powder 🌸❄️</h1>
                <p>Explore Japan’s seasons and plan your perfect trip!</p>
            </section>
            <section className={styles.seasonsSection}>
                <Seasons />
            </section>
        </main>
    )
}