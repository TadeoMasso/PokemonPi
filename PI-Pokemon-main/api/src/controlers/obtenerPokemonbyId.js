const { Pokemons } = require("../db.js");

const obtenerId = async (id) => {
  try {
    let creado = await Pokemons.findByPk(id);

    return creado;
  } catch (error) {
    return error.message;
  }
};
module.exports = obtenerId;
