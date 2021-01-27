import { AuthenticateDto, AuthenticationResultDto, SignUpDto, TokenRefreshDto, TokenRefreshResultDto } from './../types/account-types';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from '../services/account-service';

@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() body: SignUpDto): Promise<AuthenticationResultDto> {
    return this.accountService.signUp(body);
  }

  @Post('authenticate')
  authenticate(@Body() body: AuthenticateDto): Promise<AuthenticationResultDto> {
    return this.accountService.authenticate(body);
  }

  @Post('token')
  token(@Body() body: TokenRefreshDto): Promise<TokenRefreshResultDto> {
    return this.accountService.tokenRefresh(body);
  }
}
