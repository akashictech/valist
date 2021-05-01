import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';

// S3 compatible IPFS uploading
// Client must pre-generate IPFS hash before requesting this endpoint
// After uploading, client must check pre-generated hash against the response hash
// This allows for a trustless pinning of the file when unable to pin to IPFS node directly
// To avoid using this, simply plug in an IPFS_HOST via .env

export default async function addFiletoIPFS(req: NextApiRequest, res: NextApiResponse) {
  const accessKeyId = process.env.FLEEK_PUBLIC;
  const secretAccessKey = process.env.FLEEK_PRIVATE;
  if (!accessKeyId || !secretAccessKey) throw new Error('Missing Fleek API Keys');

  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) throw new Error('Bucket name not set');

  if (req.method !== 'POST') return res.status(405).json({ statusCode: 405, message: 'This endpoint only supports POST' });

  try {
    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId,
      secretAccessKey,
      endpoint: 'https://storageapi.fleek.co',
      region: 'us-east-1',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });

    const post = await s3.createPresignedPost({
      Bucket: bucketName,
      Fields: {
        key: req.query.name,
      },
      Expires: 60,
      Conditions: [
        ['content-length-range', 0, 262144000], // up to 250 MB
      ],
    });

    return res.status(200).json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ statusCode: 500, message: 'Could not pin file to IPFS' });
  }
}
