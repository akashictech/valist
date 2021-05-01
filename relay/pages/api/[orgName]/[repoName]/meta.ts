import { NextApiRequest, NextApiResponse } from 'next';
import { getValist } from '../../../../utils/valist';

export default async function getRepoMeta(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName, repoName },
  } = req;

  const repoMeta = await valist.getRepoMeta(orgName.toString(), repoName.toString());

  if (repoMeta) {
    return res.status(200).json({ repoMeta });
  }
  return res.status(404).json({ statusCode: 404, message: 'No repository found!' });
}
