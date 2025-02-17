import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

function checkFile(file: Express.Multer.File): boolean {
  if (file.size <= 2097152) {
    let file_extension = file.originalname.slice(
      (Math.max(0, file.originalname.lastIndexOf('.')) || Infinity) + 1,
    );
    if (!['mp3', 'mp4', 'jpg', 'epub', 'png'].includes(file_extension))
      throw new HttpException(
        'Недопустимое расширение файла.',
        HttpStatus.BAD_REQUEST,
      );
  } else {
    throw new HttpException(
      'Большой размер. Файл не должен превышать 2Мб.',
      HttpStatus.BAD_REQUEST,
    );
  }
  return true;
}

@Injectable()
export class FileValidationPipe implements PipeTransform<any> {
  async transform(file: any, metadata: ArgumentMetadata): Promise<any> {
    checkFile(file);
    return file;
  }
}

@Injectable()
export class FilesValidationPipe implements PipeTransform<any> {
  async transform(files: any, metadata: ArgumentMetadata): Promise<any> {
    for (var file of files) {
      checkFile(file);
    }
    return files;
  }
}
