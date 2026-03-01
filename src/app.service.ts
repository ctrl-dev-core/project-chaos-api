import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    return {
      datetime: new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date()),
      message: 'Servicio disponible',
    };
  }
}
