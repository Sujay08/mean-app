import { Component, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subject } from "rxjs";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent implements OnInit {

  post: any = {};
  private postUpdated = new Subject<Post>();
  public mode = 'create';
  public postId: string;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      }else{
        this.mode = 'create';
        this.postId = null
      }
    })
  }

  onPostSubmit(){
    if(this.mode == 'create'){
      this.postService.addPost(this.post.title, this.post.content);
    }else{
      this.postService.updatePost(this.postId,this.post.title, this.post.content)
    }
  }

}
