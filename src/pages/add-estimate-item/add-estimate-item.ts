import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddEstimatePage } from '../add-estimate/add-estimate';
import { AddItemPage } from '../add-item/add-item';

import { items, Item } from '../add-item/add-item';
import { Estimate } from '../add-estimate/add-estimate';

export interface estimateItems {
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export class EstimateItem {
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  subTotal: number;
}

@IonicPage()
@Component({
  selector: 'page-add-estimate-item',
  templateUrl: 'add-estimate-item.html',
})

export class AddEstimateItemPage {
  items: items[] = [];
  item: Item;
  groupedItems = [];
  currentItems: items[] = [];
  estimateItems: estimateItems[] = [];
  estimate: Estimate;
  index: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController) {
      storage.get("items").then((value)=> {
        if(value != null){
          this.items = value
          this.groupItems(this.items);
        }
      });
      this.index = navParams.get("index");
      this.estimateItems = navParams.get("estimateItems");
      this.estimate = navParams.get("estimate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEstimateItemPage');
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Quantity must be a number.',
    buttons: ['Dismiss']
  });
  alert.present();
}

  addToEstimate(item) {
    let itemIndex = this.items.indexOf(item);
    let alert = this.alertCtrl.create({
      title: 'Enter Quantity',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if(!isNaN(data.quantity)){
              item.quantity = data.quantity;
              let quantityMath = Number(item.quantity);
              let priceMath = Number(item.price);
              let subTotal = quantityMath*priceMath;
              item.subTotal = subTotal;
              this.estimateItems.push(this.items[itemIndex]);
              this.navCtrl.setRoot(AddEstimatePage, {
                estimate: this.estimate,
                index: this.index,
                estimateItems: this.estimateItems
              });
            }
            else{
              this.presentAlert();
            }
          }
        }
      ]
    });
    alert.present();
  }

  goToAddItemPage() {
    this.navCtrl.setRoot(AddItemPage, {
      estimate: this.estimate,
      index: this.index,
      estimateItems: this.estimateItems
    });
  }

  cancel() {
    this.navCtrl.setRoot(AddEstimatePage, {
      estimate: this.estimate,
      index: this.index,
      estimateItems: this.estimateItems
    });
  }

  initializeItems() {
    this.groupedItems = [];
    this.groupItems(this.items);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.groupedItems.forEach((value, index) => {
        value.items = value.items.filter((item) => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      });
      this.groupedItems = this.groupedItems.filter((group) => {
        return group.items.length > 0;
      });
    }
  }

  groupItems(items) {
    let currentLetter = false;

    items.forEach((value, index) => {

      if(value.name.charAt(0) != currentLetter){
        currentLetter = value.name.charAt(0);
        let newGroup = {
          letter: currentLetter,
          items: []
        };
        this.currentItems = newGroup.items;
        this.groupedItems.push(newGroup);
      }
      this.currentItems.push(value);
    });
  }

}
