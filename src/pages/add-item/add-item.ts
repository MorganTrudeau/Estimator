import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ItemsPage } from '../items/items';
import { AddEstimateItemPage } from '../add-estimate-item/add-estimate-item';

import { Estimate } from '../add-estimate/add-estimate';
import { estimateItems } from '../add-estimate-item/add-estimate-item';

export class Item {
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface items {
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  subTotal: number;
}

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})

export class AddItemPage {
  items: items[] = [];
  item: Item;
  comboNames: string[] = [];
  selectedItem: string;
  index: any;
  estimateItems: estimateItems[] = [];
  estimate: Estimate;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      storage.ready().then(() => {
        console.log("lez go");
      });
      storage.get("items").then((value) => {
        if(value != null){
          this.items = value
          for(var i=0; i<this.items.length; i++){
            if(this.comboNames.indexOf(this.items[i].name) == -1){
              this.comboNames.push(this.items[i].name);
            }
          }
        }
      });
      this.index = navParams.get("index");
      this.estimateItems = navParams.get("estimateItems");
      this.estimate = navParams.get("estimate");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  saveItem(name, type, size, price) {
    if(typeof name == 'string'){
      this.item = new Item;
      this.item.name=name;
      this.item.type=type;
      this.item.size=size;
      this.item.price=price;
      this.items.push(this.item);
      this.items = this.items.sort(function(a, b){
        if(a.name < b.name){
          return -1;
        }
        if(a.name > b.name){
          return 1;
        }
        if(a.name === b.name && a.type < b.type){
          return -1;
        }
        if(a.name === b.name && a.type > b.type){
          return 1;
        }
        if(a.name === b.name && a.type === b.type && a.size < b.size){
          return -1;
        }
        if(a.name === b.name && a.type === b.type && a.size >  b.size){
          return 1;
        }
        return 0;
      });
      this.storage.set("items", this.items);
      let test = this.navParams.get("estimate");
      if(test == undefined){
        this.navCtrl.setRoot(ItemsPage);
      }
      else{
        this.navCtrl.setRoot(AddEstimateItemPage, {
          estimate: this.estimate,
          index: this.index,
          estimateItems: this.estimateItems
        });
      }
    }
  }

  itemChange(nameSelect, selectedItem) {
    if(nameSelect=="addNew"){

      let alert = this.alertCtrl.create({
        title: 'Enter New Name',
        inputs: [
          {
            name: 'newName',
            placeholder: 'Name'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              if(this.selectedItem== "addNew"){
                this.selectedItem = "";
              }
            }
          },
          {
            text: 'OK',
            handler: data => {
              if(data.newName.trim() != '') {
                this.comboNames.push(data.newName);
                this.selectedItem = data.newName;
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  cancel() {
    let test = this.navParams.get("estimate");
    if(test == undefined){
      this.navCtrl.setRoot(ItemsPage);
    }
    else{
      this.navCtrl.setRoot(AddEstimateItemPage, {
        estimate: this.estimate,
        index: this.index,
        estimateItems: this.estimateItems
      });
    }
  }
}
