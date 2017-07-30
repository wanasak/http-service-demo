import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BadRequest } from 'app/common/bad-request';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) {}

  getAll() {
    return this.http
      .get(this.url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  create(resource) {
    return this.http
      .post(this.url, JSON.stringify(resource))
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(resource) {
    return this.http
      .put(this.url + '/' + resource.id, JSON.stringify(resource))
      .map(res => res.json())
      .catch(this.handleError);
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // tslint:disable-next-line:curly
    if (error.status === 404) return Observable.throw(new NotFoundError());

    // tslint:disable-next-line:curly
    if (error.status === 400)
      return Observable.throw(new BadRequest(error.json()));

    return Observable.throw(new AppError(error.json()));
  }
}
