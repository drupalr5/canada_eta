export const encryptVal = (value) => {
  try {
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    const val = btoa(value);
    return val;
  } catch (error) {
    return 0;
  }
};
 
export const decryptVal = (value) => {
  try {
    const val = atob(value)
    return val
  } catch (error) {
    return 0; 
  }
}