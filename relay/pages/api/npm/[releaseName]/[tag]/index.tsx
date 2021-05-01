import { NextApiRequest, NextApiResponse } from 'next';
import { getValist } from '../../../../../utils/valist';

export default async function getReleaseByTag(req: NextApiRequest, res: NextApiResponse) {
  console.log('Pulling package by version tag');

  const valist = await getValist();

  const {
    query: { releaseName, tag },
  } = req;

  const [orgName, repoName] = decodeURIComponent(releaseName.toString().replace('@', '')).split('/');
  const release = await valist.getReleaseByTag(orgName, repoName, tag.toString());

  if (release) {
    return res.status(200).json({
      name: repoName,
      version: release.tag,
      repository: '',
      contributors: '',
      bugs: '',
      homepage: '',
      dependencies: {},
      dist: {
        tarball: `https://ipfs.fleek.co/ipfs/${release.releaseCID}`,
      },
    });
  }
  return res.status(404).json({ statusCode: 404, message: 'No release found!' });
}
