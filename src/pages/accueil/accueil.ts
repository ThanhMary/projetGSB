import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GestionRapportPage } from '../gestion-rapport/gestion-rapport';
import { GestionPraticienPage } from '../gestion-praticien/gestion-praticien';
import {GestionMedicamentPage} from '../gestion-medicament/gestion-medicament';


@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',

})
export class AccueilPage {

  
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
  }

  public goToGestionRapport(){
    this.navCtrl.push(GestionRapportPage);
  }
  public goToGestionPraticien(){
    this.navCtrl.push(GestionPraticienPage);
  }
  public goToGestionMedicament(){
    this.navCtrl.push(GestionMedicamentPage);
  }

  
  


}
