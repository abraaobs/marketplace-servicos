const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serviceId INTEGER NOT NULL,
      customerId INTEGER NOT NULL,
      providerId INTEGER NOT NULL,
      status TEXT DEFAULT 'pendente',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(serviceId) REFERENCES Services(id),
      FOREIGN KEY(customerId) REFERENCES Users(id),
      FOREIGN KEY(providerId) REFERENCES Users(id)
    );
  `);

  console.log("Tabela Orders criada com sucesso.");
});

db.close();
