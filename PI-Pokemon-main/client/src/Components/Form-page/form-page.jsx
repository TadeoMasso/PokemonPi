import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemons, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere Name";
  } else if (!input.hp) {
    errors.hp = "Se requiere Hp";
  } else if (!input.attack) {
    errors.hp = "Se requiere Attack";
  } else if (!input.defense) {
    errors.hp = "Se requiere Defense";
  } else if (!input.speed) {
    errors.hp = "Se requiere Spedd";
  } else if (!input.height) {
    errors.hp = "Se requiere Height";
  } else if (!input.weight) {
    errors.hp = "Se requiere Weight";
  } else if (!input.image) {
    errors.hp = "Se requiere Imagen";
  }
  return errors;
}

export default function PokeForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [ setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemons(input));
    alert("Felicidades Pokemon Creado!! :D");
    setInput({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    history.push("/home");
  }
  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((ty) => ty !== el),
    });
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  return (
    <body>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <section className={styles.formP}>
        <header>
          <span>
            <p>Creador</p>
          </span>
        </header>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.pokemon}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label> Hp</label>
            <input
              type="text"
              value={input.hp}
              name="hp"
              onChange={handleChange}
            />
          </div>

          <div>
            <label> Attack</label>
            <input
              type="text"
              value={input.attack}
              name="attack"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Defense</label>
            <input
              type="text"
              value={input.defense}
              name="defense"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Speed</label>
            <input
              type="text"
              value={input.speed}
              name="speed"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Height</label>
            <input
              type="text"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Weight</label>
            <input
              type="text"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
          </div>
          <select onChange={(e) => handleSelect(e)}>
            {types.map((ty) => (
              <option value={ty.name}>{ty.name}</option>
            ))}
          </select>
          <div>
            <ul>
              <li>{input.types.map((el) => el + ",")}</li>
            </ul>
          </div>

          <button type="submit">Crear Bicho</button>
        </form>
      </section>
      {input.types.map((el) => (
        <div className="divty">
          <p>{el}</p>
          <button className="botonx" onClick={() => handleDelete(el)}>
            X
          </button>
        </div>
      ))}
    </body>
  );
}
