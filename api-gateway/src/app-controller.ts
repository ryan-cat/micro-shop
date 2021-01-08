import { All, Controller, HttpException, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import serviceConfigs from './service-configs';
import axios, { AxiosError } from 'axios';

@Controller()
export class AppController {
  constructor(@Inject(serviceConfigs.KEY) private configs: ConfigType<typeof serviceConfigs>) {}

  @All()
  async proxy(@Req() request: Request, @Res() response: Response) {
    const url = this.getProxyUrl(request);
    this.performProxy(url, request, response);
  }

  private getProxyUrl(request: Request): string {
    const pathParts = request.path.split('/');
    let firstPartOfPath = '/';

    if (pathParts.length >= 2) {
      firstPartOfPath = '/' + pathParts[1];
    }

    const service = this.configs.find((x) => x.paths.includes(firstPartOfPath));

    if (!service) {
      throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
    }

    const url = service.url + firstPartOfPath;
    return url;
  }

  private async performProxy(proxyUrl: string, originalRequest: Request, originalResponse: Response) {
    try {
      const proxyResponse = await axios.request({ method: originalRequest.method as any, url: proxyUrl, data: originalRequest.body });
      originalResponse.status(proxyResponse.status).header(proxyResponse.headers).send(proxyResponse.data);
    } catch (err) {
      const error = err as AxiosError;
      originalResponse.status(error.response.status).header(error.response.headers).send(error.response.data);
    }
  }
}
