/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

//FIXME: duplicated
const data = {
  "certificates-of-deposit": "CDB",
  ficfi: "FICFI",
  fiis: "FIIs",
  stocks: "Ações",
  "stocks-funds": "Fundos de ações",
  "treasuries-direct": "Tesouro Direto",
};

export const convertIdToTitle = (id) => {
  return id in data ? data[id] : id;
};
