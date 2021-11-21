import styles from "../styles/home.module.css";
import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Medusa + Next.js Starter{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <p className={styles.description}>
            Build blazing-fast client applications on top of a modular headless
            commerce engine. Integrate seamlessly with any 3rd party tools for a
            best-in-breed commerce stack.
          </p>
          <div className={styles.tags}>
            <div className={styles.tag} style={{ background: "lightgrey" }}>
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
            <a
              href="https://www.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "var(--logo-color-900)", color: "white" }}
              >
                Medusa
              </div>
            </a>
            <a
              href="https://nextjs.org/docs/getting-started"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#111111", color: "white" }}
              >
                Next.js
              </div>
            </a>
            <a
              href="https://stripe.com/docs"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#4379FF", color: "white" }}
              >
                Stripe
              </div>
            </a>
          </div>
          <div className={styles.links}>
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/medusajs/nextjs-starter-medusa"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              View on GitHub
              <FaGithub />
            </a>
          </div>
        </div>
        <div className={styles.products}>
          <div className={styles.grid}>
            <Link
              href={{ pathname: '/storefront'}}
              passHref
            >
              <a>
                <div className={styles.store_front_button}>
                  <span role="img" aria-label="Rocket emoji">
                    🛍️ <span>Visit Demo Storefront</span>
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const data = await client.products.list();

  return {
    props: {
      products: data.products,
    },
  };
};
