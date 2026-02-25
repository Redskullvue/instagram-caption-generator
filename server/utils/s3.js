import { S3Client } from "@aws-sdk/client-s3";

const config = useRuntimeConfig();
export const s3 = new S3Client({
  region: "us-east-1", // required but not important for S3-compatible
  endpoint: "https://c141626.parspack.net", // confirm inside ParsPack panel
  credentials: {
    accessKeyId: config.storageAccessKey,
    secretAccessKey: config.storageSecretKey,
  },
  forcePathStyle: true, // IMPORTANT for S3-compatible providers
});
