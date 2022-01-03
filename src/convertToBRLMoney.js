/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

export const convertToBRLMoney = (num) => {
  try {
    num = parseFloat(num.toFixed(2));
  } catch {
    num = 0.0;
  }
  return num.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export default convertToBRLMoney;
