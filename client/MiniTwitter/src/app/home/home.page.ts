import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { TweetPage } from '../modal/tweet/tweet.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  handler;
  constructor(public auth: AuthService,
              private modalController: ModalController) {}

  ngOnInit() {

    if (this.auth.loggedIn) {
      console.log('TTTTTTT');

      this.auth.userProfile$.subscribe(data => {
        console.log(data);

        this.handler = `@${data.nickname}`;
      });
    }



  }




  async openModal() {

    const modal = await this.modalController.create({
      component: TweetPage
    });
    return await modal.present();
  }
}
