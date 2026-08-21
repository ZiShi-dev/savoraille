import { Controller, Get } from '@nestjs/common';
import type { HealthStatus } from '@savoraill/types';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthStatus {
    return {
      status: 'ok',
      service: 'savoraill-api',
      timestamp: new Date().toISOString(),
    };
  }
}
