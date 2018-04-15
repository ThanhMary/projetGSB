import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  constructor(public navCtrl: NavController) {

  }
 private goToAccueil(){
    this.navCtrl.push(AccueilPage);
  }
  enregistrerPseudo(){
    
  }


}//fermeture de class HomePage