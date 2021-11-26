const { v4: uuidv4 } = require('uuid');

const person = (obj) => ({
  id: uuidv4(),
  name: obj.name,
  age: obj.age,
  hobbies: obj.hobbies,
});

module.exports = person;
