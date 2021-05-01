import { NextApiRequest, NextApiResponse } from 'next';
import { getValist } from '../../../../utils/valist';

export default async function getReleasesFromRepo(req: NextApiRequest, res: NextApiResponse) {
  console.log('Pulling package list');

  const valist = await getValist();

  const {
    query: { releaseName },
  } = req;

  const [orgName, repoName] = decodeURIComponent(releaseName.toString().replace('@', '')).split('/');

  if (orgName && repoName) {
    try {
      const releases = await valist.getReleasesFromRepo(orgName.toString(), repoName.toString());
      if (releases) {
        const latestTag = await valist.getLatestTagFromRepo(orgName, repoName);
        const versions: any = {};

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < releases.length; i++) {
          versions[releases[i].tag] = {
            name: repoName,
            version: releases[i].tag,
            repository: '',
            contributors: '',
            bugs: '',
            homepage: '',
            dependencies: {},
            dist: {
              tarball: `https://ipfs.fleek.co/ipfs/${releases[i].releaseCID}`,
            },
          };
        }

        return res.status(200).json({
          _id: '',
          name: '',
          'dist-tags': {
            latest: latestTag,
          },
          versions,
        });
      }
    } catch (e) {
      console.log('Could not find package in Valist');
    }
  }
  console.log('Package not Registered on Valist');
  console.log(`Fetching Package ${releaseName} from https://registry.npmjs.org`);
  return res.redirect(`https://registry.npmjs.org/${releaseName}`);
}
