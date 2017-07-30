import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private http: Http) {
    http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(res => {
        this.posts = res.json();
      })
   }

  ngOnInit() {
  }

}
