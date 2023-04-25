import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

import styles from "./main-page.module.css";

interface MainPageProps {
  extraClass?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ extraClass = "" }) => {
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <div className={styles.title_box}>
        <h1 className={`text text_type_h1 text_color_h1 ${styles.title}`}>
          МБОУ АЛГОСОШ
        </h1>
        <p
          className={`text text_type_fibonacci text_color_secondary ${styles.fibonacci_title}`}
        >
          им. Фибоначчи
        </p>
      </div>
      <div className={styles.cards_box}>
        <Link className={styles.link} to="/recursion">
          <div className={`${styles.card} ${styles.string}`} data-test-id={"string-card"}/>
        </Link>
        <Link className={styles.link} to="/fibonacci">
          <div className={`${styles.card} ${styles.fibonacci}`} data-test-id={"fibonacci-card"}/>
        </Link>
        <Link className={styles.link} to="/sorting">
          <div className={`${styles.card} ${styles.arr}`} data-test-id={"sorting-card"}/>
        </Link>
        <Link className={styles.link} to="/stack">
          <div className={`${styles.card} ${styles.stack}`} data-test-id={"stack-card"}/>
        </Link>
        <Link className={styles.link} to="/queue">
          <div className={`${styles.card} ${styles.queue}`} data-test-id={"queue-card"}/>
        </Link>
        <Link className={styles.link} to="/list">
          <div className={`${styles.card} ${styles.group}`} data-test-id={"list-card"}/>
        </Link>
      </div>
      <Marquee className={styles.ticker} gradient={false} speed={200}>
        <p
          className={`text text_type_ticker text_color_secondary ${styles.ticker_text}`}
        >
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={styles.dot_box}>
          <p className={styles.dot} />
        </div>
      </Marquee>
      <p
        className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}
      >
        © Сделано в Практикуме.
      </p>
    </main>
  );
};
