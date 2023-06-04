const db = require('../db');
const config = require('../config');
const utils = require('../utils');
const { query } = require('../db');

async function getAll() {
  const countriesResult = await db.query(`SELECT id_country, name FROM countries`);
  const teamsResult = await db.query(`SELECT id_team, name, main_sponsor, engine_suplier, origin_country FROM teams`);
  const driversResult = await db.query(`SELECT id_driver, name, last_name, team, origin_country FROM drivers`);
  const drivers = utils.getData(driversResult);
  const teams = utils.getData(teamsResult);
  const countries = utils.getData(countriesResult);
  return {drivers: drivers, teams: teams, countries: countries};
}

async function save(countries) {
  const result = await db.query(
    `INSERT INTO countries (name) VALUES ('${countries.name}')`);
  let message = 'Error during saving countries.';
  if (result.affectedRows) {
    message = 'Countries saved successfully.';
  }
  return {message};
}

async function update(id_country, countries) {
    const result = await db.query(
      `UPDATE countries SET name="${countries.name}" WHERE id_country=${id_country}`
    );
    let message = 'Error during updating countries.';
    if (result.affectedRows) {
      message = 'Countries updated successfully';
    }
    return { message };
  }

async function remove(id_country){
  const result = await db.query(
    `DELETE FROM countries WHERE id_country=${id_country}`
  );
  let message = 'Error during deleting country.';
  if (result.affectedRows) {
    message = 'Counry deleted successfully.';
  }
  return {message};
}

module.exports = {
  getAll,
  save,
  update,
  remove
}