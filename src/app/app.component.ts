import { Component } from '@angular/core';
import { Post } from "./posts/post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-code';

  posts: Post[] = [];

  receivePost(event){
    this.posts.push(event);
    console.log(this.posts)
  }

}
