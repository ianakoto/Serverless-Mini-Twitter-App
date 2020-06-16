import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(public auth: AuthService,
              public apiservice: ApiService) { }





}
