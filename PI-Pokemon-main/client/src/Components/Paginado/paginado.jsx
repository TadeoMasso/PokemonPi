import React from "react";

export default function Paginado({ pokemonPerPage, allPokemons, paginado }) {
  const pagNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons/pokemonPerPage); i++) {
    pagNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pagNumbers &&
          pagNumbers.map((number) => (
            <li className="number" >
              <a onClick={() => paginado(number)}>{number}</a>;
            </li>
          ))}
      </ul>
    </nav>
  );
}
