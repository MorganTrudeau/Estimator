import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Estimate } from '../add-estimate/add-estimate';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  index: any;
  estimate: Estimate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.index = navParams.get("index");
      this.estimate = navParams.get("estimate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  save() {
    this.viewCtrl.dismiss("save", this.index);
  }

  delete() {
    this.viewCtrl.dismiss("delete", this.index);
  }

  exit() {
    this.viewCtrl.dismiss("exit");
  }
}
