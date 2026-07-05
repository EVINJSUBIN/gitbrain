import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className="text-gradient">GitBrain</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/commit" className={styles.link}>
            Commit Gen
          </Link>
          <Link href="/review" className={styles.link}>
            Code Review
          </Link>
        </nav>
      </div>
    </header>
  );
}
