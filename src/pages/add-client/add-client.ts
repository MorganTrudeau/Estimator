import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ClientsPage } from '../clients/clients';
import { AddEstimatePage } from '../add-estimate/add-estimate';

import { Estimate } from '../add-estimate/add-estimate';
import { estimateItems } from '../add-estimate-item/add-estimate-item';

export interface clients {
  name: string;
  phone: string;
  email:  string;
  street: string;
  city: string;
  region: string;
  code: string;
  country: string;

}

export class Client {
  name: string;
  phone: string;
  email:  string;
  street: string;
  city: string;
  region: string;
  code: string;
  country: string;
}


@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClientPage {
client: Client;
clients: clients[] = [];
comboClients: string[] = [];
selectedItem: string;
estimate: Estimate;
estimateItems: estimateItems[] = [];
index: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController) {
      storage.get("clients").then((value)=> {
        if(value != null){
          this.clients = value
          for(var i=0; i<this.clients.length; i++){
            if(this.comboClients.indexOf(this.clients[i].name) == -1){
              this.comboClients.push(this.clients[i].name);
            }
          }
        }
      });
      this.index = navParams.get("index");
      this.estimateItems = navParams.get("estimateItems");
      this.estimate = navParams.get("estimate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  nameChange(nameSelect, selectedItem) {
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
              if(data.newName.trim() != ''){
                this.comboClients.push(data.newName);
                this.selectedItem = data.newName;
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  saveClient(name, phone, email, street, city, region, code, country) {
    this.client = new Client;
    this.client.name = name;
    this.client.phone = phone;
    this.client.email = email;
    this.client.street = street;
    this.client.city = city;
    this.client.region = region;
    this.client.code = code;
    this.client.country = country;
    this.clients.push(this.client);
    this.clients = this.clients.sort(function(a, b){
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if(nameA < nameB){
        return -1;
      }
      if(nameA > nameB){
        return 1;
      }
        return 0;
    });
    this.storage.set("clients", this.clients);
    let test = this.navParams.get("estimate");
    if(test == undefined){
      this.navCtrl.setRoot(ClientsPage);
    }
    else{
      this.navCtrl.setRoot(AddEstimatePage, {
        estimate: this.estimate,
        index: this.index,
        estimateItems: this.estimateItems
      });
    }
  }

  cancel() {
    let test = this.navParams.get("estimate");
    if(test == undefined){
      this.navCtrl.setRoot(ClientsPage);
    }
    else{
      this.navCtrl.setRoot(AddEstimatePage, {
        estimate: this.estimate,
        index: this.index,
        estimateItems: this.estimateItems
      });
    }
  }
}
