import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'
import Image from 'next/image'

export function Header(){

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image height='30.27px' width="108px" src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
          <a>Home</a>
          </ActiveLink>
          <ActiveLink href='/posts' activeClassName={styles.active}>
          <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton/>
      </div>
    </header>
  )
}