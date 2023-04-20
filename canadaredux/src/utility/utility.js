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
 