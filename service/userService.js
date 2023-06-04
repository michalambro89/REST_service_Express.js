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
    `INSERT INTO countries (name) VALUES ('${countries.name}}')`);
  let message = 'Error during saving countries.';
  if (result.affectedRows) {
    message = 'Countries saved successfully.';
  }
  return {message};
}

async function save(teams) {
  const result = await db.query(
    `INSERT INTO teams (name, main_sponsor, engine_suplier, origin_country) VALUES ('${teams.name}}',
    '${teams.main_sponsor}', '${teams.engine_suplier}', '${teams.origin_country}')`);
  let message = 'Error during saving teams.';
  if (result.affectedRows) {
    message = 'Teams saved successfully.';
  }
  return {message};
}

async function save(drivers) {
  const result = await db.query(
    `INSERT INTO drivers (name, last_name, team, origin_country) VALUES ('${drivers.name}}',
    '${drivers.last_name}', '${drivers.team}', '${drivers.origin_country}')`);
  let message = 'Error during saving driver.';
  if (result.affectedRows) {
    message = 'Drivers saved successfully.';
  }
  return {message};
}

async function update(id, user){
  const result = await db.query(
    `UPDATE user SET name="${user.name}", latitude="${user.latitude}", longitude="${user.longitude}" WHERE id=${id}` 
  );
  let message = 'Error during updating user.';
  if (result.affectedRows) {
    message = 'User updated successfully';
  }
  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM user WHERE id=${id}`
  );
  let message = 'Error during deleting user.';
  if (result.affectedRows) {
    message = 'User deleted successfully.';
  }
  return {message};
}

module.exports = {
  getAll,
  save,
  update,
  remove
}