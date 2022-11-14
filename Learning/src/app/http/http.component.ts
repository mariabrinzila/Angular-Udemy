import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Post } from '../post.model';

import { PostsService } from '../posts.service';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  
  ngOnInit() {
    this.errorSubscription = this.postsService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    );
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
        this.isFetching = false;
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


  onHandleError() {
    this.error = null;
  }


  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}