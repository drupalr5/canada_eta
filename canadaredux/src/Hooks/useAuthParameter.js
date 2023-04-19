const useAuthParameter = () => {
  let user = JSON.parse(JSON.parse(localStorage.getItem("user")).data);
  let type = user.type ? user.type : null;
  let name = user ? user.name : null;
  let path = type ? `/${type.toLowerCase()}` : null;
  if (type && type !== "Team") {
    type = null;
  }
  let param = {
    assign_to: type,
  };
  return { user, type, name, path, param };
};

export default useAuthParameter;
