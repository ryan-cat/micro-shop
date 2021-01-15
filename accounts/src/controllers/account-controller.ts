import { User } from './../models/account-models';
import { AuthenticateDto, AuthenticationResultDto, SignUpDto } from './../types/account-types';
import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../services/account-service';

@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('authenticate')
  authenticate(@Body() body: AuthenticateDto): Promise<AuthenticationResultDto> {
    return this.accountService.authenticate(body);
  }

  @Post()
  signUp(@Body() body: SignUpDto): Promise<User> {
    return this.accountService.signUp(body);
  }
}
