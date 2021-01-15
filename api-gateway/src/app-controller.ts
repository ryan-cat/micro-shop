import { All, Controller, HttpException, HttpStatus, Inject, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigType, ConfigService } from '@nestjs/config';
import { request, Request, Response } from 'express';
import gateConfig from './gateway-config';
import axios, { AxiosError } from 'axios';
import * as queryString from 'query-string';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(@Inject(gateConfig.KEY) private gatewayConfig: ConfigType<typeof gateConfig>, private configService: ConfigService) {}

  @All()
  async proxy(@Req() request: Request, @Res() response: Response) {
    const authToken = request.headers.authorization;
    if (authToken) {
      await this.authenticate(authToken);
    }

    const url = this.getProxyUrl(request);
    this.performProxy(url, request, response);
  }

  private authenticate(token: string): Promise<void> {
    return new Promise((res, rej) => {
      jwt.verify(token.replace('Bearer ', ''), this.configService.get<string>('JWT_ACCESS_KEY'), {}, async (err) => {
        if (err || !token.startsWith('Bearer ')) {
          rej(new UnauthorizedException('The provided token is either expired or invalid.'));
        }

        return res();
      });
    });
  }

  private getProxyUrl(request: Request): string {
    if (this.gatewayConfig.prefix && !request.path.startsWith(this.gatewayConfig.prefix)) {
      throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
    }

    let url = `${service.url}/${pathParts.slice(1).join('/')}`;

    if (Object.keys(request.query).length) {
      url = `${url}?${queryString.stringify(request.query as any)}`;
    }
    return url;
  }

  private async performProxy(proxyUrl: string, originalRequest: Request, originalResponse: Response) {
    try {
      const proxyResponse = await axios.request({ method: originalRequest.method as any, url: proxyUrl, data: originalRequest.body, headers: request.headers });
      originalResponse.status(proxyResponse.status).header(proxyResponse.headers).send(proxyResponse.data);
    } catch (err) {
      const error = err as AxiosError;
      originalResponse.status(error.response.status).header(error.response.headers).send(error.response.data);
    }
  }
}
