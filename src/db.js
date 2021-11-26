const person = require('./models/person');

// const db = [];

// module.exports = db;

class InMemoryDB {
  db = [];

  findMany = () => JSON.stringify(this.db);

  findOne = (id) => this.db.find((item) => item.id === id);

  insertOne = (obj) => {
    const pers = person(obj);
    this.db.push(pers);
    return pers;
  };

  updateOne = (id, obj) => {
    const pers = this.db.find((item) => item.id === id);
    const index = this.db.indexOf(pers);
    const updatedPers = {
      id: pers.id,
      ...obj,
    };
    this.db.splice(index, 1, updatedPers);
    return updatedPers;
  };

  deleteOne = (id) => {
    const pers = this.db.find((item) => item.id === id);
    const index = this.db.indexOf(pers);
    this.db.splice(index, 1);
  };
}

module.exports = InMemoryDB;
