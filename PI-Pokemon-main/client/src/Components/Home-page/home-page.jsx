import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons, filterByTypes, emptyFilter, filterCreated, orderByPower,orderByAbc } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/paginado.jsx";
import SearchBar from "../Search-Bar/search-bar";
import styles from "./home-page.module.css";
//import Nav from "../Nav-bar/navbar";
//import Detail from "../Detail-page/detail-page";


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, ] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonPerPage; //11
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; // 0
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);
  function handleClick(p) {
    p.preventDefault();
    dispatch(getPokemons());
  }
  const handleCreated = (event) => {
    dispatch(emptyFilter());
    dispatch(filterCreated(event.target.value));
  };

  const handleType = (event) => {
    dispatch(emptyFilter());
    dispatch(filterByTypes(event.target.value));
  };
  const handlePowerS = (event)=>{
    dispatch(emptyFilter())
    dispatch(orderByPower(event.target.value));
  }
  const handleAbc =(event)=>{
    dispatch(emptyFilter())
    dispatch(orderByAbc(event.target.value))
  }

  return (
    <div className={styles.di1}>
      <Link to="/pokecreator">Crear Pokemon</Link>
      <h1>team rocket</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload
      </button>
      <div>
        <select onChange={handlePowerS}>
          <option value="strong">+Fuerte</option>
          <option value="weak">-Fuerte</option>
        </select>
        <select onChange={handleAbc}>
          <option value="-">-</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={handleType}>
          <option value="all"> Todos</option>
          <option value="fighting"> Lucha</option>
          <option value="poison">Veneno</option>
          <option value="rock">Roca</option>
          <option value="ghost">Fantasma</option>
          <option value="fire">Fuego</option>
          <option value="grass">Pasto</option>
          <option value="psychic">Psitico</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Hada</option>
          <option value="shadow">Sombra</option>
          <option value="normal">Normal</option>
          <option value="flying">Volador</option>
          <option value="ground">Tierra</option>
          <option value="bug">Bicho</option>
          <option value="steel">Metal</option>
          <option value="water">Agua</option>
          <option value="electric">Electrico</option>
          <option value="ice">Hielo</option>
          <option value="dark">Oscuro</option>
          <option value="unknow">Desconocido</option>
        </select>
        <select onChange={handleCreated}>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existentes</option>
        </select>
        <Paginado
          pokemonPerPage={pokemonPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        <SearchBar />
        <div className={styles.card}>
          {currentPokemons?.map((p) => {
            console.log(p);

            return (
              <Link to={`/id/${p.id}`}>
                <Card
                  name={p.name}
                  image={p.image}
                  type={p.types}
                  key={p.key}
                  speed={p.speed}
                  attack={p.attack}
                  hp={p.hp}
                  defense={p.defense}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
