import { NextApiRequest, NextApiResponse } from 'next';
import getValist from '../../../../../utils/valist';

export default async function getLatestReleaseTag(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName, repoName },
  } = req;

  const latestTag = await valist.getLatestTagFromRepo(orgName.toString(), repoName.toString());

  if (latestTag) {
    return res.status(200).json({ latestTag });
  }
  return res.status(404).json({ statusCode: 404, message: 'No release found!' });
}
