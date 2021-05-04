import { NextApiRequest, NextApiResponse } from 'next';
import getValist from '../../../../utils/valist';

export default async function addOrgMetaIPFS(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ statusCode: 405, message: 'This endpoint only supports POST' });
  }

  const valist = await getValist();

  const {
    body: { metaJSON },
  } = req;

  try {
    const ipfsResponse = await valist.addJSONtoIPFS(metaJSON);

    return res.status(200).json({ ipfsResponse });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
