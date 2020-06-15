import { Injectable } from '@angular/core';
import Axios from 'axios';
import { apiEndpoint } from 'src/config';
import {Tweet } from '../type/Tweet';
import { CreateTweetRequest } from '../type/CreateTweetRequest';
import { UpdateTweet } from '../type/UpdateTweet';
import { CommentUpdate } from '../type/CommentUpdate';



export interface ImgResponse {
  uploadUrl: string;
  imageUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }



  async getTweet(idToken: string): Promise<Tweet[]> {
    console.log('Fetching Tweet');

    const response = await Axios.get(`${apiEndpoint}/tweets/user`, {
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${idToken}`
      },
    });
    console.log('Tweet:', response.data);
    return response.data.items;
  }

  async addComment(idToken: string, tweetId: string, comment: CommentUpdate ): Promise<Tweet[]> {
    console.log('Add Comment');

    const response = await Axios.patch(`${apiEndpoint}/tweets/${tweetId}`, comment, {
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${idToken}`
      },
    });
    console.log('Todos:', response.data);
    return response.data.items;
  }



  async createTweet(idToken: string, newTweet: CreateTweetRequest ): Promise<Tweet> {
    const response = await Axios.post(`${apiEndpoint}/tweets`,  JSON.stringify(newTweet), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });

    return response.data.item;
  }


  async reTweet(idToken: string, reTweet: CreateTweetRequest ): Promise<Tweet> {
    const response = await Axios.post(`${apiEndpoint}/tweets/retweet`,  JSON.stringify(reTweet), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });

    return response.data.item;
  }




  async  patchTweet(
    idToken: string,
    tweetId: string,
    updatedTweet: UpdateTweet
  ): Promise<void> {
    await Axios.patch(`${apiEndpoint}/tweets/patch/${tweetId}`, JSON.stringify(updatedTweet), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });
  }



  async  deleteTweet(
    idToken: string,
    tweetId: string
  ): Promise<void> {
    await Axios.delete(`${apiEndpoint}/tweets/${tweetId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });
  }



  async  getUploadUrl(
    idToken: string
  ): Promise<ImgResponse> {
    const response = await Axios.post(`${apiEndpoint}/tweets/attachment`, '', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    });
    return response.data;
  }


  async  uploadFile(uploadUrl: string, file: Blob): Promise<void> {
    await Axios.put(uploadUrl, file);
  }







}
