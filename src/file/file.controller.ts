import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.fileService.uploadFile(file);
  }
}
