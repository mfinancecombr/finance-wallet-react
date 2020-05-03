/*
 * Copyright (c) 2020, Marcelo Jorge Vieira (https://github.com/mfinancecombr)
 *
 * License: BSD 3-Clause
 */

import axios from "axios";
import qs from "qs";

import conf from "./conf";

const convertFormData = (formData) => {
  if (formData.date) {
    const dt = new Date(formData.date);
    formData.date = dt.toISOString();
  }
  if (formData.shares) {
    formData.shares = parseInt(formData.shares);
  }
  if (formData.price) {
    formData.price = parseFloat(formData.price);
  }
  if (formData.commission) {
    formData.commission = parseFloat(formData.commission) || 0;
  }
  return formData;
};

const MFinanceHttpClient = (type, payload) => {
  switch (type) {
    case "GET_ALL": {
      const query = payload.query ? `?${qs.stringify(payload.query)}` : "";
      const url = `${conf.mfinanceUrl}/${payload.entity}${query}`;
      return axios.get(url).then((x) => {
        return x.data;
      });
    }
    case "GET_ONE": {
      const query = payload.query ? `?${qs.stringify(payload.query)}` : "";
      const url = `${conf.mfinanceUrl}/${payload.entity}/${payload.id}${query}`;
      return axios.get(url).then((x) => {
        return x.data;
      });
    }
    case "CREATE": {
      const url = `${conf.mfinanceUrl}/${payload.entity}`;
      const formData = convertFormData(payload.formData);
      return axios.post(url, formData).then((data) => {
        return data.data;
      });
    }
    case "DELETE": {
      const url = `${conf.mfinanceUrl}/${payload.entity}/${payload.id}`;
      return axios.delete(url).then((data) => {
        return data.data;
      });
    }
    case "UPDATE": {
      const url = `${conf.mfinanceUrl}/${payload.entity}/${payload.formData.id}`;
      const formData = convertFormData(payload.formData);
      return axios.put(url, formData).then((data) => {
        return data.data;
      });
    }
    default:
      return Promise.reject(`Unsupported action type "${type}"`);
  }
};

export default MFinanceHttpClient;
