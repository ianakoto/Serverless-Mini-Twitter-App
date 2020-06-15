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
import { AlertController } from '@ionic/angular';
import { CommentUpdate } from '../type/CommentUpdate';


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
              private apiservice: ApiService,
              public alertController: AlertController) {}

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

   async presentCommentAlert(tweetItem: Tweet) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Comment',
      message: 'Add your Comment to this tweet',
      inputs: [
        {
          name: 'comment',
          type: 'textarea',
          placeholder: 'Comment goes here'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Send',
          handler: (data) => {
            const comment = data.comment;
            this.addComment(tweetItem.tweetId, comment, tweetItem.tweethandler);
          }
        }
      ]
    });

    await alert.present();
  }





  async openModal() {

    const modal = await this.modalController.create({
      component: TweetPage
    });
    return await modal.present();
  }


  addComment(tweetId, usercomment, handler) {
    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;

      const rcomment: CommentUpdate = {
        comment: usercomment,
        tweethandler: handler
      };
      await  this.apiservice.addComment(Token, tweetId, rcomment);


    });
  }


  reTweet(tweet: Tweet) {

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
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
      const update: UpdateTweet = {
        like: 1
      };
      await  this.apiservice.patchTweet(Token, tweetId, update);


    });



  }


}
