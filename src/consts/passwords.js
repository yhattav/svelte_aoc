const passwordInput = '402328-864247'

export const passwordRange = passwordInput.split('-');

export const passwordRangeStart = Number(passwordRange[0]);
export const passwordRangeEnd = Number(passwordRange[1]);
export const passwordLowestStartDigit = Number(passwordRange[0][0]);
export const passwordHighestStartDigit = Number(passwordRange[1][0]);


