import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { clients, Client } from '../add-client/add-client';
import { ClientsPage } from '../clients/clients';

@IonicPage()
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage {
  clients: clients[] = [];
  client: Client;
  index: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      this.clients = navParams.get('clients');
      this.client = navParams.get('client');
      this.index = navParams.get('index');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
  }

  changeItem(client) {
    this.clients[this.index] = client;
    this.storage.set("clients", this.clients);
    this.navCtrl.setRoot(ClientsPage);
  }

  deleteItem() {
    this.clients.splice(this.index, 1);
    this.storage.set("clients", this.clients);
    this.navCtrl.setRoot(ClientsPage);
  }
  
  backToClientPage() {
    this.navCtrl.setRoot(ClientsPage);
  }
}
