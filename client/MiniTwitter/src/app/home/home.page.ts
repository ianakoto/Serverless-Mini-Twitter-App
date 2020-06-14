import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { TweetPage } from '../modal/tweet/tweet.page';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Tweet } from '../type/Tweet';
import { TweetsService } from '../services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  handler;
  data$;
  isAuthenticated$;
  constructor(public auth: AuthService,
              private tweetService: TweetsService,
              private modalController: ModalController) {}

  async ionViewDidEnter() {

  // await this.getTweet(this.isAuthenticated$);

  }




  ngOnInit() {
    this.tweetService.getTweet();

  }



  async openModal() {

    const modal = await this.modalController.create({
      component: TweetPage
    });
    return await modal.present();
  }
}
