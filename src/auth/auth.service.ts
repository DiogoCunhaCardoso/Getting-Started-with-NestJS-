import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authenticate(): void {
    console.log('authenticating...');
  }
}
