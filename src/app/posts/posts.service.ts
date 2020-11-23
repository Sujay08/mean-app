import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class PostService{

  private posts:Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ){}

  getPosts(){
    this.http
    .get<{message: string, data: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.data.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id,
        }
      }) 
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListner(){
    return this.postUpdated.asObservable();
  } 

  getPost(id: string){
    return {...this.posts.find(p => p.id === id)}
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content}
    this.http
    .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe(res=>{
      const id = res.postId;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    })
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/'+id, post)
    .subscribe(res=>{
      console.log('PUT?',res);
    });
  }

  deletePost(postID:string){
    this.http.delete('http://localhost:3000/api/posts/'+postID)
    .subscribe((res:any)=>{ 
      console.log("deleted!", res);
      const updatedPosts = this.posts.filter(post => post.id !== postID);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]); 
    });
  }

}
