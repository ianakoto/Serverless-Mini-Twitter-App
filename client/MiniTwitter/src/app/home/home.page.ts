import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { TweetPage } from '../modal/tweet/tweet.page';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Tweet } from '../type/Tweet';
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
  isTweetSent = false;
  constructor(public auth: AuthService,
              private modalController: ModalController,
              public toastController: ToastController,
              private apiservice: ApiService,
              public alertController: AlertController) {}

  async ionViewDidEnter() {



  }




  ngOnInit() {
    this.getTweet();

  }

  async presentToast(sendMessage: string) {
    const toast = await this.toastController.create({
      message: sendMessage,
      duration: 4000,
      position: 'top',
    });
    toast.present();
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
    modal.onDidDismiss().then( dt => {
      console.log(this.isTweetSent);
      if ( dt) {
        this.getTweet();
      }

    });


    return await modal.present();
  }


  addComment(tweetId, usercomment, handler) {
    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
      const crtat =  new Date().toISOString();
      const rcomment: CommentUpdate = {
        comment: usercomment,
        tweethandler: handler,
        createdAt: crtat
      };
      await  this.apiservice.addComment(Token, tweetId, rcomment).then( () => {
        this.getTweet();
        this.presentToast('Comment added');

      });


    });
  }


  reTweet(tweet: Tweet) {

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
      const twetby = `retweeted by ${tweet.tweethandler}`;
      const retwet: CreateTweetRequest = {
        comment: tweet.comment,
        tweethandler: twetby,
        attachmentUrl: tweet.attachmentUrl
      };
      await  this.apiservice.reTweet(Token, retwet).then(() => {
        this.getTweet();
        this.presentToast('item retweet complete');
      } );


    });
  }


  addLike(tweetItem: Tweet) {
    console.log(tweetItem);

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;
      const setLike = tweetItem.like + 1;
      const update: UpdateTweet = {
        like: setLike
      };
      await  this.apiservice.patchTweet(Token, tweetItem.tweetId, update).then( () => {
        this.getTweet();
      });


    });



  }



  deleteTweet(tweetItem: Tweet) {
    console.log(tweetItem);

    this.auth.auth0Client$.subscribe (async client => {

      const Token =  await (await client.getIdTokenClaims()).__raw;

      await  this.apiservice.deleteTweet(Token, tweetItem.tweetId).then(() => {
        this.getTweet();
        this.presentToast('Delete Successfull');
      });


    });

  }


}
