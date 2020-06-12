import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.page.html',
  styleUrls: ['./tweet.page.scss'],
})
export class TweetPage implements OnInit {
  imgurl;
  comment;
  user;
  handler;
  constructor(private modalController: ModalController,
              public toastController: ToastController,
              private apiservice: ApiService,
              public auth: AuthService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(data => {
      console.log(data);

      this.user = data.nickname;
    });
    console.log(this.user);

  }



  async presentToast(sendMessage: string) {
    const toast = await this.toastController.create({
      message: sendMessage,
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }


  async closeModal() {


    await this.modalController.dismiss();
  }


  async sendTweet() {

    if (!this.comment || !this.imgurl) {
      this.presentToast('Failed to send Tweet. Make sure the field are not empty');
    }else{
      // this.apiservice.createTweet()
      this.presentToast('Tweet Sent successfully');
    }

    await this.modalController.dismiss();
  }



  onTextChange(event) {
    this.comment = event.target.value;
    console.log( this.comment);

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.imgurl = file;
      console.log(file);
  }

  }




}
