import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsPage } from '../items/items';
import { AddEstimatePage } from '../add-estimate/add-estimate';
import { Storage } from '@ionic/storage';

import { Item } from '../add-item/add-item';
import { items } from '../add-item/add-item';
import { Estimate } from '../add-estimate/add-estimate';
import { estimateItems } from '../add-estimate-item/add-estimate-item';



@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Item;
  items: items[] = [];
  index: any;
  estimate: Estimate;
  estimateItems: estimateItems[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      this.items = navParams.get('items');
      this.item = navParams.get('item');
      this.index = navParams.get('index');
      this.estimateItems = navParams.get("estimateItems");
      this.estimate = navParams.get("estimate");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  backToLastPage() {
    this.navCtrl.setRoot(ItemsPage);
  }

  changeItem(item) {
    this.items[this.index] = item;
    this.storage.set("items", this.items);
    this.navCtrl.setRoot(ItemsPage);
  }
  deleteItem() {
    this.items.splice(this.index, 1);
    this.storage.set("items", this.items);
    this.navCtrl.setRoot(ItemsPage);
  }
}
