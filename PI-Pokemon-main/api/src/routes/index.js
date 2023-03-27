const crearPokemon = require("../controlers/creacionPokemon");
const { Router, query } = require("express");
const obtenerId = require("../controlers/obtenerPokemonbyId");
const { Pokemons, Type } = require("../db.js");
const axios = require("axios");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//Hecho
const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=24`);
  const apiUrlFiltrada = apiUrl.data.results.map((p) => p.url);
  //console.log(apiUrl.data.results);
  const results = await Promise.all(
    apiUrlFiltrada.map((url) => axios.get(url))
  );
  const data = results.map((results) => {
    return results.data;
  });
  const apiInfo = await data.map((p) => {
    return {
      id: p.id,
      name: p.name,
      hp: p.stats[0].base_stat,
      attack: p.stats[1].base_stat,
      defense: p.stats[2].base_stat,
      speed: p.stats[5].base_stat,
      height: p.height,
      weight: p.weight,
      image: p.sprites.other.dream_world.front_default,
      types: p.types.map((p) => p.type.name),
    };
  });
  return apiInfo;
};
const getDbInfo = async () => {
  return await Pokemons.findAll({
    includes: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getAllPokemon = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};
//No hay que tocar HECHA
router.get("/pokemons", async (req, res) => {
  try {
    const getPokemons = await getAllPokemon();
    res.status(200).json(getPokemons);
  } catch (error) {
    res.status(500).send(error.message);
  }
}),
//Hecha
  router.get("/id/:id", async (req, res) => {
    const  { id } = req.params;
    let pokeTotal = await getAllPokemon();
    console.log(id);

    if(id.length > 5){
    const pokemonIdCreado = pokeTotal.filter((p) => p.id === id);
    console.log(typeof id);
    if (pokemonIdCreado) {
        return res.status(200).json(pokemonIdCreado)}
    }
    if (id) {
      let pokemonId = pokeTotal.filter((p) => p.id === Number(id));
      if (pokemonId) {
        return res.status(200).json(pokemonId);
      }
      return res.status(404).send("No esta el pokemon");
    }
  });
 // Hecha
router.get("/pokename", async (req, res) => {
  const { name } = req.query;
  let pokeTotal = await getAllPokemon();
  console.log(pokeTotal);
  if (name) {
    let pokemonName = pokeTotal.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    if (pokemonName) {
      return res.status(200).json(pokemonName);
    }
    return res.status(404).send("No esta el pokemon");
  }
});
//No hay que tocar HECHA
router.post("/createpokemons", async (req, res) => {
 const {name, id, image, hp , attack, speed, defense, height, weight} = req.body
const poke = {name, id, image, hp , attack, speed, defense, height, weight}
  try {
    const  pokemons = await crearPokemon(poke);

    res.status(200).send(pokemons);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//Hecha
router.get("/types", async (req, res) => {
  const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);

  const tipos = await typesApi.data;
  for (t of tipos.results) {
    const existe = await Type.findOne({
      where: {
        name: t.name,
      },
    });
    if (existe) return res.json(await Type.findAll());
    await Type.create({ name: t.name });
  }
  res.json(await Type.findAll());
});

module.exports = router;
// Envias pokemon/:id = params
//recibis?nombre = query
//objeto = body
// al renderizar nunca renderizar ID
