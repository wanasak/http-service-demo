import { BadRequest } from './../common/bad-request';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .catch((error: Response) => {
        // tslint:disable-next-line:curly
        if (error.status === 400)
          return Observable.throw(new BadRequest(error.json()));

        return Observable.throw(new AppError(error.json()));
      });
  }

  updatePost(post) {
    return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }

  deletePost(post) {
    return this.http.delete(this.url + '/' + post.id)
      .catch((error: Response) => {
        // tslint:disable-next-line:curly
        if (error.status === 404)
          return Observable.throw(new NotFoundError());

        return Observable.throw(new AppError(error.json()));
      });
  }

}
