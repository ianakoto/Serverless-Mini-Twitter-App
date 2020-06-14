import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateTweetRequest } from 'src/app/type/CreateTweetRequest';
import { TweetsService } from 'src/app/services/tweets.service';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.page.html',
  styleUrls: ['./tweet.page.scss'],
})
export class TweetPage implements OnInit {
  imgurl;
  comment;
  constructor(private modalController: ModalController,
              public toastController: ToastController,
              private apiservice: ApiService,
              private tweetService: TweetsService,
              public auth: AuthService) { }

 async ngOnInit() {
    this.auth.auth0Client$.subscribe(async data => {

      console.log(await (await data.getIdTokenClaims()).__raw);
    });

    this.tweetService.getTweet();



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


      try {

        this.auth.auth0Client$.subscribe(async data => {
          const idToken = await (await data.getIdTokenClaims()).__raw;
          const response = await this.apiservice.getUploadUrl(idToken);
          const uplodUrl = response.uploadUrl;
          const imageUrl = response.imageUrl;
          const handler = `@${await (await data.getIdTokenClaims()).nickname}`;
          await this.apiservice.uploadFile(uplodUrl, this.imgurl);

          const newTweek: CreateTweetRequest = {
            comment: this.comment,
            tweethandler: handler,
            attachmentUrl: imageUrl
           };
          this.apiservice.createTweet(idToken, newTweek).then(() => {
          this.presentToast('Tweet Sent successfully');
          });

         });





      } catch (error) {
        this.presentToast('Failed to send Tweet.');
      }

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
