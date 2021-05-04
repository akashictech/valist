import { NextApiRequest, NextApiResponse } from 'next';
import getValist from '../../../../../utils/valist';

export default async function getReleaseMeta(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName, repoName, tag },
  } = req;

  const release = await valist.getReleaseByTag(orgName.toString(), repoName.toString(), tag.toString());

  if (release) {
    // return res.status(200).json({releaseMeta: release.releaseMeta});
    return res.redirect(`https://ipfs.fleek.co/ipfs/${release.metaCID}`);
  }
  return res.status(404).json({ statusCode: 404, message: 'No release found!' });
}
