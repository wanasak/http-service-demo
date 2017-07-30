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
    this.service.getAll().subscribe(
      posts => (this.posts = posts),
      error => {
        throw error;
      }
    );
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.service.create(post).subscribe(
      newPost => {
        newPost['id'] = newPost.id;
        this.posts.splice(0, 0, newPost);
      },
      (error: AppError) => {
        if (error instanceof BadRequest) {
        } else {
          throw error;
        }
      }
    );
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
    //   .subscribe(res => console.log(res));
    this.service
      .update(post)
      .subscribe(updatedPost => console.log(updatedPost));
  }

  deletePost(post) {
    this.service.delete(post.id).subscribe(
      () => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already  been deleted.');
        } else {
          throw error;
        }
      }
    );
  }
}
