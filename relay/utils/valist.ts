import Valist, { Web3Providers } from "valist";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

let valist: Valist;

export async function getValist() {
  if (!valist) {
    const web3Provider = publicRuntimeConfig.WEB3_PROVIDER;
    if (!web3Provider) throw new Error("WEB3_PROVIDER environment variable not set");

    const valist = new Valist({
      web3Provider: new Web3Providers.HttpProvider(web3Provider),
      metaTx: false,
    });

    await valist.connect();
  }

  return valist;
}
