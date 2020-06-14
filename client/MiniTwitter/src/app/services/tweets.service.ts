import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Tweet } from '../type/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  tweetData: Observable<Tweet[]>;
  constructor(public auth: AuthService,
              private apiservice: ApiService) { }



 getTweet() {

 return this.auth.auth0Client$.subscribe (async client => {
    let data;
    const isauth = await client.isAuthenticated();
    console.log('is auth: ', isauth);

    if (isauth ) {
      const idtoken = await (await client.getIdTokenClaims()).__raw;

      const Token =  await (await client.getIdTokenClaims()).__raw;
      console.log(Token);
      data = await this.apiservice.getTweet(Token);
      console.log(data);
    }


    return data;

  });
 }

}
