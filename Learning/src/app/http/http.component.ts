import { Component, OnInit } from '@angular/core';

import { Post } from '../post.model';

import { PostsService } from '../posts.service';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private postsService: PostsService) {}

  
  ngOnInit() {
    this.getPosts();
  }


  private getPosts() {
    this.isFetching = true;

    // Send GET HTTP request through the service
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;

        console.log(error);
      }
    );
  }


  onCreatePost(postData: Post) {
    // Send POST HTTP request through the service
    this.postsService.createAndStorePost(postData.title, postData.content);
  }


  onFetchPosts() {
    this.getPosts();
  }


  onClearPosts() {
    // Send DELETE HTTP request through the service
    this.postsService.deletePosts().subscribe(
      () => {
        // Clear loaded posts array
        this.loadedPosts = [];
      }
    );
  }
}