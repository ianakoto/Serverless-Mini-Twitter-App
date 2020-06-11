import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.page.html',
  styleUrls: ['./tweet.page.scss'],
})
export class TweetPage implements OnInit {
  imgurl;
  comment;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  async closeModal() {


    await this.modalController.dismiss();
  }


  async sendTweet() {

    await this.modalController.dismiss();
  }



  onTextChange(event) {
    this.comment = event.target.value;

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.imgurl = file;

  }

  }




}
