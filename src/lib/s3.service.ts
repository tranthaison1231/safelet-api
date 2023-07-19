import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from '@/utils/constants';
import { getFileName } from '@/utils/file';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

class S3Service {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = getFileName(file.originalname);
      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await this.s3.send(command);
      const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
      return { url };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const s3Service = new S3Service();
