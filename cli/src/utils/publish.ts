import * as fs from 'fs';
import * as path from 'path';
import { initValist, parseValistConfig, ValistConfig } from './config';
import { npmPack } from './npm';

const getBinary = async ({ artifact, meta }: ValistConfig) => {
  if (!artifact) {
    console.error('👻 No build artifact found!');
    process.exit(1);
  }

  const releaseFile = fs.createReadStream(path.join(process.cwd(), artifact));
  const metaFile = fs.createReadStream(path.join(process.cwd(), meta));

  return { releaseFile, metaFile };
};

const getNpmPackage = async ({ meta }: ValistConfig) => {
  console.log('🛠  Packing NPM Package...');
  const tarballName = await npmPack();
  console.log('💼 Packed:', tarballName);

  const releaseFile = fs.createReadStream(path.join(process.cwd(), tarballName));
  const metaFile = fs.createReadStream(path.join(process.cwd(), meta));

  return { releaseFile, metaFile };
};

const getRelease = {
  binary: getBinary,
  npm: getNpmPackage,
};

export const publish = async () => {
  const valist = await initValist();

  const config = parseValistConfig();

  const { releaseFile, metaFile } = await getRelease[config.type](config);

  const { org, project, tag } = config;

  console.log('🪐 Preparing release on IPFS...');
  const releaseObject = await valist.prepareRelease(tag, releaseFile, metaFile);
  console.log('📦 Release Object:', releaseObject);

  try {
    console.log('⚡️ Publishing Release to Valist...');
    const { transactionHash } = await valist.publishRelease(org, project, releaseObject);

    console.log(`✅ Successfully Released ${project} ${tag}!`);
    console.log('📖 IPFS address of release:', `ipfs://${releaseObject.releaseCID}`);
    console.log('🔗 Transaction Hash:', transactionHash);
  } catch (e) {
    // noop, error already handled/logged within, move on to cleanup
  }

  // cleanup generated tarball/build artifact
  if (config.type === 'npm') {
    fs.unlinkSync(releaseFile.path);
  }
};