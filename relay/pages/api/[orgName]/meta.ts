import { NextApiRequest, NextApiResponse } from 'next';
import { getValist } from '../../../utils/valist';

export default async function getOrganizationMeta(req: NextApiRequest, res: NextApiResponse) {
  const valist = await getValist();

  const {
    query: { orgName },
  } = req;

  const orgMeta = await valist.getOrganizationMeta(orgName.toString());

  if (orgMeta) {
    return res.status(200).json({ orgMeta });
  }
  return res.status(404).json({ statusCode: 404, message: 'No organization found!' });
}
