import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from './home.module.scss';
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";
import Image from "next/image";

interface HomeProps{
  product:{
    priceId: string,
    amount: string;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        {/* Este Head importado do next serve para que, 
        o que for colocado dentro dele, será anexado
        ao arquivo _document.tsx.
        como por exemplo nesse caso, quando essa página for 
        renderizada, o título dela será anexado ao arquivo
        _document.
        dessa maneira o título não fica igual quando é acessado
        outra página, cada página tem seu próprio título */}
        <title>Home | Ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏🏻 Hey, welcome</span>
          <h1>News About the <span>React</span> world</h1>
          <p>Get access to all the publications <br/>
            <span>for {product.amount}</span>
          </p>
          <SubscribeButton/>
        </section>
        <Image width="334px" height="520px" src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
}

export const getStaticProps:GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1K4sDPLYOmztIIKwELWQNZrO')

  const product = {
    priceID: price.id,
    //formatação do preço
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',

    }).format(price.unit_amount / 100),

  }
  return{ 
    props:{
      product,
    },
    revalidate: 60 * 60 * 24 //24 horas
  }
}