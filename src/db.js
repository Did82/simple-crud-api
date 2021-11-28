const person = require('./models/person');

class InMemoryDB {
  db = [];

  findMany = () => JSON.stringify(this.db);

  findOne = (id) => this.db.find((item) => item.id === id);

  insertOne = (obj) => {
    const pers = person(obj);
    this.db.push(pers);
    return pers;
  };

  updateOne = (pers, newPers) => {
    const index = this.db.indexOf(pers);
    const updatedPers = {
      id: pers.id,
      ...newPers,
    };
    this.db[index] = updatedPers;
    return updatedPers;
  };

  deleteOne = (pers) => {
    const index = this.db.indexOf(pers);
    this.db.splice(index, 1);
  };
}

module.exports = InMemoryDB;
