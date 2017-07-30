import { ErrorHandler } from '@angular/core';

export class AppErroHandler implements ErrorHandler {
  handleError(error: any): void {
    alert('An unexpected error occured.');
    console.error(error);
  }
}
