import { Controller, Get, UseGuards } from '@nestjs/common';
import { USER_ROLE } from 'src/constants/UserRoles.enum';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class AuthController {
  @Get('profile')
  /*   @UseGuards(new AuthGuard([USER_ROLE.ADMIN])) */
  getprofile(@User() user: any): string {
    return `User ID ${user.userId}, Username: ${user.username}, Role: ${user.role}`;
  }
}
