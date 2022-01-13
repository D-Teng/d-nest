import { Code, Message } from 'src/common/constants/http-response.constant';

export class ResponseData<T> {
  code: number;
  message: string;
  data?: T;
  static buildSuccess<T>(
    data: T,
    message: string = Message.OK,
    code: number = Code.OK,
  ): ResponseData<T> {
    return new ResponseData<T>(code, message, data);
  }
  static buildFail<T>(code: number, message: string): ResponseData<T> {
    return new ResponseData<T>(code, message);
  }
  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    if (data !== undefined) this.data = data;
  }
}
