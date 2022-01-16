import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmptyFilterPipe implements PipeTransform<any, any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('EmptyFilterPipe');
    for (let i in value) {
      if (!value[i]) {
        delete value[i];
      }
    }
    return value;
  }
}
