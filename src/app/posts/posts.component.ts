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

  constructor(private http: Http) {
    http.get(this.url)
      .subscribe(res => {
        this.posts = res.json();
      })
   }

  ngOnInit() {
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

}
