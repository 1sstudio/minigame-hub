import styles from "./game.module.css";
import type { Metadata, ResolvingMetadata } from 'next'
import Image from "next/image";
import Header from '@/app/ui/header';
import Container from 'react-bootstrap/Container';
import { fetchGame, fetchGames } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import UnityFrame from '../../components/unity';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const games = await fetchGames();
  return games.map(game => ({slug: game.short_name}));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const game = await fetchGame(slug);

  // serve 404 here. will terminate.
  if(!game) {
    notFound();
  }

  // ok great.
  return {
    title: game.display_name,
    description: game.description,
    openGraph: {
      title: game.og_title || game.display_name,
      description: game.og_description || game.description,
      images: [`/${game.og_thumbnail || game.thumbnail}`],
      url: `https://minigames.dropout.tv/game/${game.short_name}`,
      siteName: "Game Changer Minigames",
    }
  }
}
 
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const game = await fetchGame(slug);

  if(!game) {
    // serve 404 if we can't resolve. this throws, so we don't need to worry about a return here.
    notFound();
  }

  return (
    <div className={`${styles.game}`}>
      <Header />
      <Container as="main" className={`${styles.main} container-sm py-4 mx-auto mb-4`}>
        <h2 className={styles.game_header}>{game.display_name}</h2>
        <div className={styles.cursors}>
          <Image
            src={`/white-cursor.svg`}
            width={80}
            height={120}
            className={`${styles.cursor} ${styles.white}`}
            alt=""
          />
          <Image
            src={`/blue-cursor.svg`}
            width={80}
            height={60}
            className={`${styles.cursor} ${styles.blue}`}
            alt=""
          />
          <Image
            src={`/orange-cursor.svg`}
            width={80}
            height={120}
            className={`${styles.cursor} ${styles.orange}`}
            alt=""
          />
          <Image
            src={`/yellow-cursor.svg`}
            width={30}
            height={40}
            className={`${styles.cursor} ${styles.yellow}`}
            alt=""
          />
        </div>
            {!!game.hosted_root && (
              <UnityFrame game={game}/>
            )}
      </Container>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
