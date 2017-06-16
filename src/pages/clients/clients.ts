import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddClientPage } from '../add-client/add-client';
import { ClientDetailPage } from '../client-detail/client-detail';

import { clients } from '../add-client/add-client';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
clients: clients[] = [];
currentClients: clients[] = [];
groupedClients = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      storage.ready().then(()=>{
        console.log("lez go")
      });

      storage.get("clients").then((value)=>{
        if(value != null){
          this.clients = value;
          this.groupClients(this.clients);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
  }

  showClientDetail(client) {
    let index = this.clients.indexOf(client);
    this.navCtrl.setRoot(ClientDetailPage, {
      clients: this.clients,
      client: client,
      index: index,
    });
  }

  goToAddClientPage() {
    this.navCtrl.setRoot(AddClientPage);
  }

  initializeClients() {
    this.groupedClients = [];
    this.groupClients(this.clients);
  }

  getClients(ev: any) {
    // Reset items back to all of the items
    this.initializeClients();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.groupedClients.forEach((value, index) => {
        value.clients = value.clients.filter((client) => {
          return client.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
      });
      this.groupedClients = this.groupedClients.filter((group) => {
        return group.clients.length > 0;
      });
    }
  }

  groupClients(clients) {
    let currentLetter = false;

    clients.forEach((value, index) => {

      if(value.name.charAt(0) != currentLetter){
        currentLetter = value.name.charAt(0);
        let newGroup = {
          letter: currentLetter,
          clients: []
        };
        let newGroupCopy = {
          letter: currentLetter,
          clients: []
        };
        this.currentClients = newGroup.clients;
        this.groupedClients.push(newGroup);
      }
      this.currentClients.push(value);
    });
  }
}
