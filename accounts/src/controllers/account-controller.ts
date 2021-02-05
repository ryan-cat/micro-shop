import { AuthenticationResultDto, SignUpDto, TokenRefreshDto, TokenRefreshResultDto } from './../types/account-types';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AccountService } from '../services/account-service';
import { LocalAuthGuard } from '../utils/local-strategy';

@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() body: SignUpDto): Promise<AuthenticationResultDto> {
    return this.accountService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  authenticate(@Req() req): Promise<AuthenticationResultDto> {
    return this.accountService.login(req.user);
  }

  @Post('token')
  token(@Body() body: TokenRefreshDto): Promise<TokenRefreshResultDto> {
    return this.accountService.tokenRefresh(body);
  }
}
