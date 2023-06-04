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

async function save(drivers) {
  const result = await db.query(
    `INSERT INTO drivers (name, last_name, team, origin_country) VALUES ('${drivers.name}',
    '${drivers.last_name}', '${drivers.team}', '${drivers.origin_country}')`);
  let message = 'Error during saving driver.';
  if (result.affectedRows) {
    message = 'Driver saved successfully.';
  }
  return {message};
}

async function update(id_driver, drivers){
  const result = await db.query(
    `UPDATE drivers SET name="${drivers.name}", last_name="${drivers.latitude}", team="${drivers.longitude}", origin_country="${drivers.longitude}" WHERE id_driver=${id_driver}` 
  );
  let message = 'Error during updating driver.';
  if (result.affectedRows) {
    message = 'Driver updated successfully';
  }
  return {message};
}

async function remove(id_driver){
  const result = await db.query(
    `DELETE FROM drivers WHERE id_driver=${id_driver}`
  );
  let message = 'Error during deleting driver.';
  if (result.affectedRows) {
    message = 'Driver deleted successfully.';
  }
  return {message};
}

module.exports = {
  getAll,
  save,
  update,
  remove
}