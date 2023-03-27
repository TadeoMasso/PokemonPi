import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing-page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.divLand}>
      <h1>Centro Pokemon Lo De Tato</h1>
      <Link to="/home">
        <button>
          Ingresar
        </button>
      </Link>
    </div>
  );
}
