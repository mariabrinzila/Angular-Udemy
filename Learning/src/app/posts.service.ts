import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";

import { map } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) {}

    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        };

        // Send POST HTTP request
        this.http.post<{ name: string }>(
            'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            postData
        ).subscribe(
            responseData => {
                console.log(responseData);
            }
        );
    }


    fetchPosts() {
        // Send GET HTTP request
        return this.http.get<{ [key: string]: Post }>(
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
        );
    }


    deletePosts() {
        // Send DELETE HTTP request
        return this.http.delete(
            'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        );
    }
}