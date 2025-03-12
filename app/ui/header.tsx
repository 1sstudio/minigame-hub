import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Header() {
    return (
      <header className={`${styles.header} mx-auto`}>
        <h1>
          <Link href="/">
            <span className="visually-hidden">Game Changer</span>
            <Image
              className={styles.logo}
              src="/logo.png"
              alt="Game Changer logo"
              width={600}
              height={431}
            />
          </Link>
        </h1>
      </header>
    );
}