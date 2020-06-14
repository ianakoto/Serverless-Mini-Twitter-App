import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Tweet } from '../type/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  tweetData$: Observable<Tweet[]>;
  constructor(public auth: AuthService,
              ) { }





}
