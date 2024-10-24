async function getConnection() {
  return connection;
}

async function initializeDatabase() {
  return true;
}

async function getUsersCards(userID) {
  let usersCards = [];
  return usersCards;
}

module.exports = { getConnection, initializeDatabase, getUsersCards };
