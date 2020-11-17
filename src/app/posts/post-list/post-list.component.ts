import { Component, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { PostService } from '../posts.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  receivePost :Post[] = [];
  private postsSub: Subscription;

  constructor(
    public postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListner()
    .subscribe((posts: Post[])=>{
      this.receivePost = posts;
    });
  }

  // ngOnDestroy(){
  //   this.postsSub.unsubscribe();
  // }

  deletePost(postID:string){
    console.log('huh',this.receivePost)
    this.postService.deletePost(postID)
  }

}
