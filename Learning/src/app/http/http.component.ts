import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  
  ngOnInit() {
    this.fetchPosts();
  }


  onCreatePost(postData: { title: string; content: string }) {
    // POST HTTP request
    this.http.post(
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
    // GET HTTP request
    this.http.get(
      'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    ).pipe(
      // Transform our data to an array of JavaScript objects 
      map(
        responseData => {
          const postsArray = [];

          for (const key in responseData)
            if (responseData.hasOwnProperty(key))
              // Use the ... operator to make a new JavaScript object where we also store the key as the id
              postsArray.push({ ...responseData[key], id: key });

          return postsArray;
        }
      )
    ).subscribe(
      posts => {
        console.log(posts);
      }
    );
  }
}