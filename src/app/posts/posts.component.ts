import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(res => {
        this.posts = res.json();
      });
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(res => {
        post['id'] = res.json().id;
        this.posts.splice(0, 0, post);
      });
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
    //   .subscribe(res => console.log(res));
    this.http.put(this.url + '/' + post.id, JSON.stringify(post))
      .subscribe(res => console.log(res));
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(res => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

}
