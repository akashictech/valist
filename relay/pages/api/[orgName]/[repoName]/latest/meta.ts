import { NextApiRequest, NextApiResponse } from 'next';
import getValist from '../../../../../utils/valist';

export default async function getLatestReleaseMeta(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName, repoName },
  } = req;

  const latestRelease = await valist.getLatestReleaseFromRepo(orgName.toString(), repoName.toString());

  if (latestRelease) {
    // return res.status(200).json({releaseMeta});
    return res.redirect(`https://ipfs.fleek.co/ipfs/${latestRelease.metaCID}`);
  }
  return res.status(404).json({ statusCode: 404, message: 'No release found!' });
}
