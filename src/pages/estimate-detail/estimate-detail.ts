import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddEstimatePage } from '../add-estimate/add-estimate';

import { estimateItems, EstimateItem } from '../add-estimate-item/add-estimate-item'
import { Estimate } from '../add-estimate/add-estimate';

@IonicPage()
@Component({
  selector: 'page-estimate-detail',
  templateUrl: 'estimate-detail.html',
})
export class EstimateDetailPage {
  estimate: Estimate;
  estimateItems: estimateItems[] = [];
  estimateItem: EstimateItem;
  index: any;
  itemIndex: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public storage: Storage) {
      this.itemIndex = navParams.get("itemIndex");
      this.index = navParams.get("index");
      this.estimateItems = navParams.get("estimateItems");
      this.estimateItem = navParams.get("estimateItem");
      this.estimate = navParams.get("estimate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstimateDetailPage');
  }

  changeItem(estimateItem) {
    let quantityMath = Number(estimateItem.quantity);
    let priceMath = Number(estimateItem.price);
    let subTotal = quantityMath*priceMath;
    estimateItem.subTotal = subTotal;
    this.estimateItems[this.itemIndex] = estimateItem;
    this.navCtrl.setRoot(AddEstimatePage, {
      estimate: this.estimate,
      index: this.index,
      estimateItems: this.estimateItems
    });
  }

  deleteItem() {
    this.estimateItems.splice(Number(this.itemIndex), 1);
    this.navCtrl.setRoot(AddEstimatePage, {
      estimate: this.estimate,
      index: this.index,
      estimateItems: this.estimateItems
    });
  }
}
