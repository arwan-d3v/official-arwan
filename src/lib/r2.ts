import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize Cloudflare R2 Client via S3 API
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Utility function to upload files (like profile pictures/project assets) to R2
 */
export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("R2 bucket name is not configured.");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    const response = await r2Client.send(command);
    return response;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
}
