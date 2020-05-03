/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

export const convertToBRLFloat = (num) => {
  num = parseFloat(num.toFixed(2));
  return num.toLocaleString("pt-br", { minimumFractionDigits: 2 });
};
