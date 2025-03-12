import styles from "./page.module.css";
import Image from "next/image";
import Link from 'next/link';
import Header from '@/app/ui/header';
import { fetchGames } from '@/app/lib/data';
export default async function Home() {
  const games = await fetchGames();
  
  return (
    <div className={`${styles.page} hub`}>
      <Header />
      <main className={`${styles.main} ${styles.hubmain}`}>
        <Image
          src={`/orange-sparkle.svg`}
          width={320}
          height={240}
          className={`top-sparkle`}
          alt=""
        />
        <div className={styles.gamelist}>
          {games?.filter(game => game.listed).map((game) => (
            <div
              key={game.id}
              className={`${styles.game}`}
            >
              <Link
                href={`/game/${game.short_name}`}
                className={styles.primary}
              >
                <Image
                  src={`/${game.thumbnail}`}
                  width={720}
                  height={480}
                  alt=""
                />
                <h2 className={styles.game_name}>{game.display_name}</h2>
              </Link>
            </div>
          ))}
        </div>
        <Image
          src={`/question-marks.svg`}
          width={320}
          height={240}
          className={`question-marks`}
          alt=""
        />
        <Image
          src={`/purple-sparkle.svg`}
          width={320}
          height={240}
          className={`bottom-sparkle`}
          alt=""
        />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
