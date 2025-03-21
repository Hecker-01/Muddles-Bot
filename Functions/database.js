const { User } = require("discord.js");
const db = require("../Database/db.js");

async function createCard(member) {
  console.log(`Creating ${member.username}'s card`);
  const discordID = member.id;
  const roles = member.roles?.cache; // Safely access roles
  const rarity = roles ? await determineRarity(roles) : 0; // Default rarity if roles are undefined
  const query = `
      INSERT INTO cards (discordID, rarity) VALUES (?, ?)
      ON CONFLICT(discordID) DO UPDATE SET rarity = excluded.rarity;
    `;
  await db.run(query, [discordID, rarity]);
  return await db.get(`SELECT cardID FROM cards WHERE discordID = ?;`, [
    discordID,
  ]);
}

async function doesCardExist(member) {
  console.log(`Checking if ${member.username}'s card exists`);
  const discordID = member.id;
  const query = `SELECT EXISTS(SELECT 1 FROM cards WHERE discordID = ?) AS cardExists;`; // Renamed alias
  const result = await db.get(query, [discordID]);
  return result.cardExists === 1; // Use the new alias
}

async function getCardID(member) {
  console.log(`Getting ${member.username}'s card ID`);
  const discordID = member.id;
  return await db.get(`SELECT cardID FROM cards WHERE discordID = ?;`, [
    discordID,
  ]);
}

async function getCardRarity(member) {
  console.log(`Getting ${member.username}'s card rarity`);
  const discordID = member.id;
  return await db.get(`SELECT rarity FROM cards WHERE discordID = ?;`, [
    discordID,
  ]);
}

async function addUser(member) {
  try {
    console.log(`Adding ${member.username} to the database`);
    const userID = member.id;
    const query = `INSERT INTO users (userID, creditScore) VALUES (?, 0) ON CONFLICT(userID) DO NOTHING;`;
    await db.run(query, [userID]);
    await createCard(member);
  } catch (error) {
    console.error(`Failed to add user ${member.username}:`, error);
  }
}

async function doesUserExist(member) {
  console.log(`Checking if ${member.username} exists`);
  const userID = member.id;
  const query = `SELECT EXISTS(SELECT 1 FROM users WHERE userID = ?) AS userExists;`; // Renamed alias
  const result = await db.get(query, [userID]);
  const doesHeExist = result.userExists === 1; // Use the new alias
  if (!doesHeExist) {
    await addUser(member);
  }
  return doesHeExist;
}

async function getUserCredit(member) {
  console.log(`Getting ${member.username}'s credit score`);
  const userID = member.id;
  if (!(await doesUserExist(member))) {
    await addUser(member);
  }
  const query = `SELECT creditScore FROM users WHERE userID = ?;`;
  return await db.get(query, [userID]);
}

async function updateUserCredit(member, creditAmount) {
  console.log(`Adding ${creditAmount} to ${member.username}'s credit`);
  const userID = member.id;
  await doesUserExist(member); // Add `await`
  const query = `UPDATE users SET creditScore = creditScore + ? WHERE userID = ?;`;
  await db.run(query, [creditAmount, userID]);
  return await db.get(`SELECT creditScore FROM users WHERE userID = ?;`, [
    userID,
  ]);
}

async function setUserCredit(member, creditAmount) {
  console.log(`Setting ${member.username}'s credit to ${creditAmount}`);
  const userID = member.id;
  await doesUserExist(member); // Add `await`
  const query = `UPDATE users SET creditScore = ? WHERE userID = ?;`;
  await db.run(query, [creditAmount, userID]);
  return await db.get(`SELECT creditScore FROM users WHERE userID = ?;`, [
    userID,
  ]);
}

const roleRarityMap = {
  "1240775070213738637": 1,
  "1240775162929090592": 2,
  "1240775362783219733": 3,
  "1240775429154017411": 4,
  "1240775547924250705": 5,
  "1240775655306559498": 6,
  "1240776002104463402": 7,
  "1240776079107428494": 8,
  "1240776203665801347": 9,
  "1240776346200834220": 10,
  "1240776497674063953": 11,
  "1240776617211596880": 12,
  "1240776732332527616": 13,
  "1240776918186590258": 14,
  "1240777090832535593": 15,
  "1240777214300258355": 16,
};

async function determineRarity(roles) {
  for (const [roleID, rarity] of Object.entries(roleRarityMap)) {
    if (roles.some((role) => role.id === roleID)) {
      return rarity;
    }
  }
  return 0;
}

module.exports = {
  // User-related functions
  addUser,
  doesUserExist,
  getUserCredit,
  updateUserCredit,
  setUserCredit,

  // Card-related functions
  createCard,
  doesCardExist,
  getCardID,
  getCardRarity,
  determineRarity,
};
