import { CheckoutService } from './../services/checkout-service';
import { AuthenticatedUser, AuthUser } from '@micro-shop/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutDto } from 'src/types/checkout-types';

@Controller('checkouts')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post()
  checkout(@AuthUser() user: AuthenticatedUser, @Body() dto: CheckoutDto) {
    return this.checkoutService.checkout(user, dto);
  }
}
