import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', 'statics');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const filePath = path.join(uploadDir, file.originalname);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    fs.writeFileSync(filePath, file.buffer);

    return {
      path: filePath,
    };
  }
}
