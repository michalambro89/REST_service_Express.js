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

async function save(teams) {
  const result = await db.query(
    `INSERT INTO teams (name, main_sponsor, engine_suplier, origin_country) VALUES ('${teams.name}',
    '${teams.main_sponsor}', '${teams.engine_suplier}', '${teams.origin_country}')`);
  let message = 'Error during saving teams.';
  if (result.affectedRows) {
    message = 'Teams saved successfully.';
  }
  return {message};
}

async function update(id_team, teams) {
    const result = await db.query(
      `UPDATE teams SET name="${teams.name}",main_sponsor="${teams.main_sponsor}", engine_suplier="${teams.engine_suplier}" WHERE id_team=${id_team}`
    );
    let message = 'Error during updating team.';
    if (result.affectedRows) {
      message = 'Team updated successfully';
    }
    return { message };
  }

async function remove(id_team){
  const result = await db.query(
    `DELETE FROM teams WHERE id_team=${id_team}`
  );
  let message = 'Error during deleting team.';
  if (result.affectedRows) {
    message = 'Team deleted successfully.';
  }
  return {message};
}

module.exports = {
  getAll,
  save,
  update,
  remove
}