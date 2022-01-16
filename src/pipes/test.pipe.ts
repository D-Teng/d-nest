import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipe implements PipeTransform<any, any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('TestPipe');
    return value;
  }
}
