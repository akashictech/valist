import { NextApiRequest, NextApiResponse } from 'next'
import Valist, { Web3Providers } from 'valist';

export default async function getRepoMeta(req: NextApiRequest, res: NextApiResponse) {

  // set .env.local to your local chain or set in production deployment
  if (process.env.WEB3_PROVIDER) {
    const provider = new Web3Providers.HttpProvider(process.env.WEB3_PROVIDER);

    const valist = new Valist(provider, false);
    await valist.connect();

    const {
      query: { orgName, repoName },
    } = req;

    const repoMeta = await valist.getRepoMeta(orgName.toString(), repoName.toString());

    return res.status(200).json({repoMeta});

  } else {
    return res.status(500).json({statusCode: 500, message: "No Web3 Provider!"});
  }
}