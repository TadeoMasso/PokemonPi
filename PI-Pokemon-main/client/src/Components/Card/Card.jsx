import React from "react";
import styles from "./Card.module.css";

export default function Card({
  name,
  image,
  type,
  hp,
  speed,
  attack,
  defense,
  id,
}) {
  return (
    <div className={styles.card}>
      <figure className={styles.figure}>
        <h2 className={styles.name}>{name}</h2>
        <h3 className={styles.type}>{type}</h3>
        {/* <ul className={styles.stats}>
          <h2>Stats</h2>
          <li>{hp}</li>
          <li>{speed}</li>
          <li>{attack}</li>
          <li>{defense}</li>
        </ul> */}
        
        <img
          className={styles.img}
          src={image}
          alt="img no encontrada"
          height="250px"
        />
      </figure>
    </div>
  );
}
