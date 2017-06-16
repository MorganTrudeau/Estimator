import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddEstimatePage } from '../add-estimate/add-estimate';
import { Storage } from '@ionic/storage';

import { estimates, Estimate } from '../add-estimate/add-estimate';

@Component({
  selector: 'page-estimate',
  templateUrl: 'home.html'
})
export class HomePage {
  estimates: estimates[] = [];
  estimatesCopy: estimates[] = [];
  estimate: Estimate;

  constructor(public navCtrl: NavController,
     public storage: Storage) {
    storage.ready().then(()=>{
      console.log("lez go")
    });
    storage.get("estimates").then((value)=>{
      if(value != null){
        this.estimates = value;
        this.estimatesCopy = value;
      }
    });
  }
  
    createNewEstimate() {
      let index = String(this.estimates.length);
      this.navCtrl.setRoot(AddEstimatePage, {
        create: "create",
        init: "init",
        index: index
      });
    }

    showEstimateDetail(estimate) {
      let index = String(this.estimates.indexOf(estimate));
      this.navCtrl.setRoot(AddEstimatePage, {
        create: "create",
        init: "init",
        index: index,
        estimate: estimate
      });
    }

    initializeItems() {
      this.estimates = this.estimatesCopy;
    }

    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.estimates = this.estimates.filter((estimate) => {
          return estimate.invoice.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      }
    }
  }
