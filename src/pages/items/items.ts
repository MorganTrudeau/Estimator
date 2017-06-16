import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { Storage } from '@ionic/storage';
import { ItemDetailPage } from '../item-detail/item-detail';

import { items } from '../add-item/add-item';

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})

export class ItemsPage {
  items: items[] = [];
  groupedItems = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      storage.get("items").then((value)=> {
        if(value != null){
          this.items = value;
          this.groupItems(this.items);
        }
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  groupItems(items) {
    let currentItems: items[] = [];
    let currentLetter = false;

    items.forEach((value, index) => {

      if(value.name.charAt(0) != currentLetter){
        currentLetter = value.name.charAt(0);
        let newGroup = {
          letter: currentLetter,
          items: []
        };
        currentItems = newGroup.items;
        this.groupedItems.push(newGroup);
      }
      currentItems.push(value);
    });
  }

  goToAddItemPage() {
    this.navCtrl.setRoot(AddItemPage);
  }

  showItemDetail(item) {
    let index = this.items.indexOf(item);
    this.navCtrl.setRoot(ItemDetailPage, {
      items: this.items,
      item: item,
      index: index
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
}
