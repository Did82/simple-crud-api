const isPersonValid = (data) => {
  const name = data.name && typeof data.name === 'string';
  const age = data.age && typeof data.age === 'number';
  const hobbies = Array.isArray(data.hobbies) && data.hobbies.every((item) => typeof item === 'string');
  return name && age && hobbies;
};

module.exports = isPersonValid;
