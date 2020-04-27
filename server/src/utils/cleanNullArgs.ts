// 기존의 데이터를 업데이트 하는 resovler의 경우
// 업데이트 가능한 값들중 일부만 업데이트 하는경우
// 값에 null이 들어갈 수 있음
// db에 null값이 업로드 되는 위험이 있음
// 이경우 cleanNullArgs함수를 이용해 null값을 삭제해줌
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
