import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { TweetPage } from '../modal/tweet/tweet.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  handler;
  data;
  constructor(public auth: AuthService,
              private apiService: ApiService,
              private modalController: ModalController) {}

  ionViewDidEnter() {
    if (this.auth.loggedIn) {
      console.log('TTTTTTT');

      this.auth.auth0Client$.subscribe(async client => {

        this.handler = `@${(await client.getIdTokenClaims()).nickname}`;
        const idToken = await (await client.getIdTokenClaims()).sid;
        this.data =  this.apiService.getTweet(idToken);

      });


    }
  }




  ngOnInit() {
  }




  async openModal() {

    const modal = await this.modalController.create({
      component: TweetPage
    });
    return await modal.present();
  }
}
