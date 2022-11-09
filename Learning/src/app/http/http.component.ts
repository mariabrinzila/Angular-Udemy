import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

import { Post } from '../post.model';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  
  ngOnInit() {
    this.fetchPosts();
  }


  onCreatePost(postData: Post) {
    // POST HTTP request
    this.http.post<{ name: string }>(
      'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData
    ).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }


  onFetchPosts() {
    this.fetchPosts();
  }


  onClearPosts() {
    // HTTP request
  }


  private fetchPosts() {
    this.isFetching = true;

    // GET HTTP request
    this.http.get<{ [key: string]: Post }>(
      'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    ).pipe(
      // Transform our data to an array of JavaScript objects 
      map(
        responseData => {
          const postsArray: Post[] = [];

          for (const key in responseData)
            if (responseData.hasOwnProperty(key))
              // Use the ... operator to make a new JavaScript object where we also store the key as the id
              postsArray.push({ ...responseData[key], id: key });

          return postsArray;
        }
      )
    ).subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      }
    );
  }
}