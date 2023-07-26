import { z } from 'zod';

export const getPresignedUrlDto = z.object({
  fileName: z.string(),
  type: z.string(),
  folderPrefix: z.string().optional(),
});

export type GetPresignedUrlDto = Required<z.infer<typeof getPresignedUrlDto>>;
