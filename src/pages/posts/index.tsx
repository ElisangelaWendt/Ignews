import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from '@prismicio/client'
import { GetStaticProps } from "next";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>
              Visões inovadoras do código livre e do open source no
              desenvolvimento da internet
            </strong>
            <p>
              Linux, React, Angular.js, Mozilla, Apache, HTTP, Docker e
              Kubernetes. Softwares distintos, desenvolvidos por pessoas
              diferentes, empresas diferentes, propósitos diferentes e que, às
              vezes, disputam um espaço no imenso mercado da tecnologia. Todos
              com um traço em comum: são fontes de código aberto, open source,
              disponíveis para a colaboração e desenvolvimento de toda
              comunidade.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>
              Visões inovadoras do código livre e do open source no
              desenvolvimento da internet
            </strong>
            <p>
              Linux, React, Angular.js, Mozilla, Apache, HTTP, Docker e
              Kubernetes. Softwares distintos, desenvolvidos por pessoas
              diferentes, empresas diferentes, propósitos diferentes e que, às
              vezes, disputam um espaço no imenso mercado da tecnologia. Todos
              com um traço em comum: são fontes de código aberto, open source,
              disponíveis para a colaboração e desenvolvimento de toda
              comunidade.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>
              Visões inovadoras do código livre e do open source no
              desenvolvimento da internet
            </strong>
            <p>
              Linux, React, Angular.js, Mozilla, Apache, HTTP, Docker e
              Kubernetes. Softwares distintos, desenvolvidos por pessoas
              diferentes, empresas diferentes, propósitos diferentes e que, às
              vezes, disputam um espaço no imenso mercado da tecnologia. Todos
              com um traço em comum: são fontes de código aberto, open source,
              disponíveis para a colaboração e desenvolvimento de toda
              comunidade.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ],{
    fetch: ['publication.title', 'publication.content'], //quais dados buscar do prismic
    pageSize: 100,
  })

  console.log(JSON.stringify(response,null, 2))

  return{ 
    props: {}
  }
}