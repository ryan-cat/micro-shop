import { JwtAuthGuard } from './jwt-utils';
import { JwtService } from '@nestjs/jwt';
import { All, Controller, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import gateConfig from './gateway-config';
import axios, { AxiosError } from 'axios';
import * as queryString from 'query-string';
import { NotFoundError } from '@micro-shop/common';

@Controller()
export class AppController {
  constructor(@Inject(gateConfig.KEY) private gatewayConfig: ConfigType<typeof gateConfig>, private jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @All()
  async proxy(@Req() request: Request, @Res() response: Response) {
    const url = this.getProxyUrl(request);
    this.performProxy(url, request, response);
  }

  private getProxyUrl(request: Request): string {
    if (this.gatewayConfig.prefix && !request.path.startsWith(this.gatewayConfig.prefix)) {
      throw new NotFoundError('The specified path is not applicable.');
    }

    let path = request.path;
    if (this.gatewayConfig.prefix) {
      path = path.replace(this.gatewayConfig.prefix, '');
    }

    const pathParts = path.split('/');
    let firstPartOfPath = '/';

    if (pathParts.length >= 2) {
      firstPartOfPath = '/' + pathParts[1];
    }

    const service = this.gatewayConfig.services.find((x) => x.paths.includes(firstPartOfPath));

    if (!service) {
      throw new NotFoundError('The specified path is not applicable.');
    }

    let url = `${service.url}/${pathParts.slice(1).join('/')}`;

    if (Object.keys(request.query).length) {
      url = `${url}?${queryString.stringify(request.query as any)}`;
    }
    return url;
  }

  private async performProxy(proxyUrl: string, originalRequest: Request, originalResponse: Response) {
    try {
      const proxyResponse = await axios.request({
        method: originalRequest.method as any,
        url: proxyUrl,
        data: originalRequest.body,
        headers: originalRequest.headers
      });
      originalResponse.status(proxyResponse.status).header(proxyResponse.headers).send(proxyResponse.data);
    } catch (err) {
      const error = err as AxiosError;
      originalResponse.status(error.response.status).header(error.response.headers).send(error.response.data);
    }
  }
}
