function errorCreateAndThrow(name, message) {
    const newError = new Error;
    newError.name = name;
    newError.message = message;
    throw newError;
}

module.exports = {
    errorCreateAndThrow
};