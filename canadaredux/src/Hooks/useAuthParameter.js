const useAuthParameter = () => {
  let user = JSON.parse(localStorage.getItem("user"))? JSON.parse(JSON.parse(localStorage.getItem("user")).data) : '';
  let type = user.type ? user.type : null;
  let atype = user.type ? user.type : null;
  let name = user ? user.name : null;
  let path = type ? `/${type.toLowerCase()}` : null;
  if (atype && atype !== "Team") {
    atype = null;
  }
  let param = {
    assign_to: atype,
  };
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return { user, type, name, path, param, token };
};

export default useAuthParameter;
