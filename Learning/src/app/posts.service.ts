import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";

import { Post } from "./post.model";

import { map, catchError, throwError, Subject, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        };

        // Send POST HTTP request
        this.http.post<{ name: string }>(
            'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            postData,
            {
                observe: 'response'
            }
        ).subscribe(
            responseData => {
                console.log(responseData);
            },
            error => {
                this.error.next(error);
            }
        );
    }


    fetchPosts() {
        let searchParams = new HttpParams();

        // searchParams is immutable
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        // Send GET HTTP request
        return this.http.get<{ [key: string]: Post }>(
            'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            {
                headers: new HttpHeaders({ 'Custom-header': 'Hello' }),
                params: searchParams, // new HttpParams().set('print', 'pretty')
                responseType: 'json'
            }
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
            ),
            catchError(
                errorResponse => {
                    // Send to analytics server etc.
                    // return throwError(errorMessage);
                    return throwError(() => errorResponse);
                }
            )
        );
    }


    deletePosts() {
        // Send DELETE HTTP request
        return this.http.delete(
            'https://angular-udemy-b02da-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(
                event => {
                    console.log(event);

                    if (event.type === HttpEventType.Response)
                        console.log(event.body);
                }
            )
        );
    }
}