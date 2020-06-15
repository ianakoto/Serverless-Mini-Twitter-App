import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { TweetPage } from '../modal/tweet/tweet.page';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Tweet } from '../type/Tweet';
import { TweetsService } from '../services/tweets.service';
import { UpdateTweet } from '../type/UpdateTweet';
import { CreateTweetRequest } from '../type/CreateTweetRequest';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  handler;
  data$;
  constructor(public auth: AuthService,
              private modalController: ModalController,
              private apiservice: ApiService) {}

  async ionViewDidEnter() {



  }




  ngOnInit() {
    this.getTweet();

  }



  getTweet() {
    this.auth.auth0Client$.subscribe (async client => {
      let data;
      const isauth = await client.isAuthenticated();
      console.log('is auth: ', isauth);
      if (isauth ) {
        const idtoken = await (await client.getIdTokenClaims()).__raw;
        const Token =  await (await client.getIdTokenClaims()).__raw;
        console.log(Token);
        data = await this.apiservice.getTweet(Token);
        console.log(data);
        this.data$ = data;

      }
    });
   }

  async openModal() {

    const modal = await this.modalController.create({
      component: TweetPage
    });
    return await modal.present();
  }


  addComment(tweetId) {

  }


  reTweet(tweet: Tweet) {

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
      console.log(Token);
      const retwet: CreateTweetRequest = {
        comment: tweet.comment,
        tweethandler: tweet.tweethandler,
        attachmentUrl: tweet.attachmentUrl
      };
      await  this.apiservice.reTweet(Token, retwet);


    });
  }


  addLike(tweetId) {

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
      console.log(Token);
      const update: UpdateTweet = {
        like: 1
      };
      await  this.apiservice.patchTweet(Token, tweetId, update);


    });



  }


}
