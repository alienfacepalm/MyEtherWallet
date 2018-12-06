import { post } from '@/helpers/httpRequests';
import { changellyMethods } from './config';
import { swapApiEndpoints } from '../partnersConfig';

function buildPath() {
  return swapApiEndpoints.base + swapApiEndpoints.changelly;
}

function buildPayload(method, data) {
  return {
    jsonrpc: '2.0',
    method: method,
    params: data,
    id: parseInt(Math.random() * 100)
  };
}

const getCurrencies = async network => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(changellyMethods[network].currenciesFull, {})
    );
    return results.result;
  }
  return Promise.resolve({});
};

const getRate = async (fromCurrency, toCurrency, fromValue, network) => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(changellyMethods[network].rate, {
        from: fromCurrency,
        to: toCurrency,
        amount: fromValue
      })
    );
    return results.result;
  }
  return Promise.resolve(-1);
};

const getMin = async (fromCurrency, toCurrency, fromValue, network) => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(changellyMethods[network].min, {
        from: fromCurrency,
        to: toCurrency
      })
    );
    return results.result;
  }
  return Promise.resolve(-1);
};

const validateAddress = async (addressDetails, network) => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(changellyMethods[network].validate, addressDetails)
    );
    return results.result;
  }
  return Promise.resolve(-1);
};

const createTransaction = async (transactionParams, network) => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(
        changellyMethods[network].createTransaction,
        transactionParams
      )
    );
    return results.result;
  }
  return Promise.resolve(-1);
};

const getStatus = async (orderId, network) => {
  if (changellyMethods[network]) {
    const results = await post(
      buildPath(),
      buildPayload(changellyMethods[network].status, {
        id: orderId
      })
    );
    return results.result;
  }
  throw Error(`Changelly does not support ${network} network`);
};

const login = () => {
  return Promise.resolve({});
};

export default {
  getCurrencies,
  getRate,
  getMin,
  validateAddress,
  createTransaction,
  getStatus,
  login
};
