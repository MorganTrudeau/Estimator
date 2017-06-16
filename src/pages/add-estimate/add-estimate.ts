import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, reorderArray } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AddClientPage } from '../add-client/add-client';
import { AddEstimateItemPage } from '../add-estimate-item/add-estimate-item';
import { EstimateDetailPage } from '../estimate-detail/estimate-detail';
import { PopoverPage } from '../popover/popover';
import { EstimatePdfPage } from '../estimate-pdf/estimate-pdf'

import { clients } from '../add-client/add-client';
import { estimateItems } from '../add-estimate-item/add-estimate-item';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

export class Estimate {
  invoice: string;
  client: string;
  date: string;
}

export interface estimates {
  invoice: string;
  client: string;
  date: string;
}

@IonicPage()
@Component({
  selector: 'page-add-estimate',
  templateUrl: 'add-estimate.html',
})
export class AddEstimatePage {
estimates: estimates[] = [];
estimateItems: estimateItems[] = [];
estimate: Estimate = {
  invoice: "",
  client: "",
  date: ""
};
clients: clients[] = [];
comboClients: string[] = [];
index: any;
subTotal: number = 0;
tax: number;
grandTotal: number;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage: Storage,
     public alertCtrl: AlertController,
     public popoverCtrl: PopoverController) {
    storage.ready().then(() => {
      console.log("lez go");
    });
    storage.get("clients").then((value)=>{
      if(value != null){
        this.clients = value
        for(var i=0; i<this.clients.length; i++){
          if(this.comboClients.indexOf(this.clients[i].name) == -1){
            this.comboClients.push(this.clients[i].name);
          }
        }
      }
    });
    storage.get("estimates").then((value)=>{
      if(value != null){
        this.estimates = value
      }
    });
    this.index = navParams.get("index");
    let test1 = navParams.get("init");
    if(test1 == "init") {
      storage.get("estimateItems" + this.index).then((value)=>{
        if(value != null){
          this.estimateItems = value
          this.calculateSubTotal(value);
          this.calculateTax();
          this.calculateGrandTotal();
        }
      });
    }
    let test2 = navParams.get("estimate");
    if(test2 != undefined){
      this.estimate = test2;
      if(this.estimate.client == "addNew"){
        this.estimate.client = "";
      }
    }
    let test3 = navParams.get("estimateItems");
    if(test3 != undefined){
      this.estimateItems = test3;
      this.calculateSubTotal(test3);
      this.calculateTax();
      this.calculateGrandTotal();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEstimatePage');
  }

  calculateSubTotal(estimateItems) {
    for(let i=0; i<estimateItems.length; i++){
      this.subTotal += Number(estimateItems[i].subTotal);
    }
  }

  calculateTax() {
    this.tax = 0.05 * this.subTotal;
  }

  calculateGrandTotal() {
    this.grandTotal = this.subTotal + this.tax;
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Enter an invoice number.',
    buttons: ['Dismiss']
  });
  alert.present();
}

  /*saveEstimate(invoice, clientSelect, date) {
    if(invoice.trim() == ''){
      this.presentAlert();
    }
    else{
      if(this.estimates[Number(this.index)] == undefined){
        this.estimate = new Estimate;
        this.estimates.push(this.estimate);
      }
      this.estimates[Number(this.index)].invoice = invoice;
      this.estimates[Number(this.index)].client = clientSelect;
      this.estimates[Number(this.index)].date = date;
      this.storage.set("estimates", this.estimates);
      this.storage.set("estimateItems" + this.index, this.estimateItems);
      this.navCtrl.setRoot(HomePage);
    }
  }*/

  saveEstimate() {
    if(this.estimate.invoice.trim() == ''){
      this.presentAlert();
    }
    else{
      if(this.estimates[Number(this.index)] == undefined){
        this.estimates.push(this.estimate);
      }
      this.estimates[Number(this.index)].invoice = this.estimate.invoice;
      this.estimates[Number(this.index)].client = this.estimate.client;
      this.estimates[Number(this.index)].date = this.estimate.date;
      this.storage.set("estimates", this.estimates);
      this.storage.set("estimateItems" + this.index, this.estimateItems);
      this.navCtrl.setRoot(HomePage);
    }
  }

  clientChange(clientSelect, invoice, client, date) {
    if(clientSelect=="addNew"){
      this.estimate.invoice = invoice;
      this.estimate.client = clientSelect;
      this.estimate.date = date;
      this.navCtrl.setRoot(AddClientPage, {
        estimate: this.estimate,
        index: this.index,
        estimateItems: this.estimateItems
      });
    }
  }

  goToAddEstimateItemPage(invoice, clientSelect, date) {
    this.estimate.invoice = invoice;
    this.estimate.client = clientSelect;
    this.estimate.date = date;
    this.navCtrl.setRoot(AddEstimateItemPage, {
      estimate: this.estimate,
      index: this.index,
      estimateItems: this.estimateItems
    });
  }

  showEstimateItemDetail(estimateItem, invoice, clientSelect, date) {
    this.estimate.invoice = invoice;
    this.estimate.client = clientSelect;
    this.estimate.date = date;
    let itemIndex = this.estimateItems.indexOf(estimateItem);
    this.navCtrl.setRoot(EstimateDetailPage, {
      itemIndex: itemIndex,
      index: this.index,
      estimateItem: estimateItem,
      estimateItems: this.estimateItems,
      estimate: this.estimate,
    })
  }

  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

  deleteEstimate(index) {
    this.estimates.splice(Number(this.index),1);
    this.storage.set("estimates", this.estimates);
    this.storage.remove("estimateItems" + this.index);
    this.navCtrl.setRoot(HomePage);
  }

  presentPopover(myEvent, invoice, clientSelect, date) {
    this.estimate.invoice = invoice;
    this.estimate.client = clientSelect;
    this.estimate.date = date;
    let popover = this.popoverCtrl.create(PopoverPage, {
      index: this.index,
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((id, index) => {
      if( id == "exit"){
        this.navCtrl.setRoot(HomePage);
      }
      if(id == "delete"){
        this.deleteEstimate(index);
      }
      if(id == "save"){
        this.saveEstimate();
      }
    })
  }

  reorderItems(indexes){
        this.estimateItems = reorderArray(this.estimateItems, indexes);
  }

  displayPDF() {
    var src = {
      content: [
        {
          text: 'Estimate',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            'street adress\n',
            'city, region, code\n',
            'phone\n',
            'email\n'
          ],
          style:'header',
          bold: false
        },
        {
			style: 'tableExample',
			table: {
				body: [
					['Column 1', 'Column 2', 'Column 3'],
					['One value goes here', 'Another one here', 'OK?']
				]
			}
		},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
			     margin: [200, 5, 0, 15]
		    }
      }
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    //pdfMake.createPdf(src).open();
    pdfMake.createPdf(src).getDataUrl((dataUrl)=>{
      this.navCtrl.setRoot(EstimatePdfPage, {
        data: dataUrl
      });
    });
  }
}
