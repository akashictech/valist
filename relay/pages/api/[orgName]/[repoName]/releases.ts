import { NextApiRequest, NextApiResponse } from 'next';
import { getValist } from '../../../../utils/valist';

export default async function getReleasesFromRepo(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName, repoName },
  } = req;

  const releases = await valist.getReleasesFromRepo(orgName.toString(), repoName.toString());

  if (releases) {
    return res.status(200).json(releases.reverse());
  }
  return res.status(404).json({ statusCode: 404, message: 'No releases found!' });
}
