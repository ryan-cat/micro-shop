import { All, Controller, HttpException, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { request, Request, Response } from 'express';
import gatewayConfig from './gateway-config';
import axios, { AxiosError } from 'axios';
import * as queryString from 'query-string';

@Controller()
export class AppController {
  constructor(@Inject(gatewayConfig.KEY) private config: ConfigType<typeof gatewayConfig>) {}

  @All()
  async proxy(@Req() request: Request, @Res() response: Response) {
    const url = this.getProxyUrl(request);
    this.performProxy(url, request, response);
  }

  private getProxyUrl(request: Request): string {
    if (this.config.prefix && !request.path.startsWith(this.config.prefix)) {
      throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
    }

    let path = request.path;
    if (this.config.prefix) {
      path = path.replace(this.config.prefix, '');
    }

    const pathParts = path.split('/');
    let firstPartOfPath = '/';

    if (pathParts.length >= 2) {
      firstPartOfPath = '/' + pathParts[1];
    }

    const service = this.config.services.find((x) => x.paths.includes(firstPartOfPath));

    if (!service) {
      throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
    }

    const url = `${service.url}${firstPartOfPath}?${queryString.stringify(request.query as any)}`;
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
