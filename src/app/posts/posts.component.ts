import { BadRequest } from './../common/bad-request';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getPosts()
      .subscribe(res => {
        this.posts = res.json();
      }, error => {
        console.error(error);
      });
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.service.createPost(post)
      .subscribe(res => {
        post['id'] = res.json().id;
        this.posts.splice(0, 0, post);
      }, (error: AppError) => {
        if (error instanceof BadRequest) {

        } else {
          console.error(error.originalError);
        }
      });
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
    //   .subscribe(res => console.log(res));
    this.service.updatePost(post)
      .subscribe(res => console.log(res));
  }

  deletePost(post) {
    this.service.deletePost(post)
      .subscribe(res => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, (error: AppError) => {
        if (error  instanceof NotFoundError) {
          alert('This post has already  been deleted.');
        } else {
          console.error(error);
        }
      });
  }

}
