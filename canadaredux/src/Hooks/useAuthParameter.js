const useAuthParameter = () => {
  let user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(JSON.parse(localStorage.getItem("user")).data) : '';
  let type = user.type ? user.type : null;
  let atype = user.type ? user.type : null;
  let name = user ? user.name : null;
  let path = type ? `/${type.replace(' ', "_").toLowerCase()}` : null;
  if (atype && atype !== "Team") {
    atype = null;
  }
  let param = {
    assign_to: atype,
  };
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  let usDate = new Date().toLocaleDateString("en-US", { timeZone: "US/Eastern", "month": "2-digit", day: "2-digit", year: "numeric" }).replaceAll("/", "-");
  let usTime = new Date().toLocaleTimeString("en-US", { timeZone: "US/Eastern", hour12: false });
  let today = new Date();
  let currentTime = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return { user, type, name, path, param, token, usDate, usTime, currentTime };
};

export default useAuthParameter;
