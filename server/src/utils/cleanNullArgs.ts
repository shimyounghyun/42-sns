const cleanNullArgs = (args: object): object => {
  const notNULL = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNULL[key] = args[key];
    }
  });
  return notNULL;
};

export default cleanNullArgs;
