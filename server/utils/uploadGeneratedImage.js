import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { s3 } from "./s3.js";

const BUCKET_NAME = "c141626";

export async function uploadImage(buffer) {
  const filename = `images/${Date.now()}-${crypto.randomUUID()}.png`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read",
    CacheControl: "public, max-age=31536000, immutable",
  });

  await s3.send(command);

  return `https://cdn.captionsaz.ir/${filename}`;
}
