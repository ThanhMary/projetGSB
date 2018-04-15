import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { RapportProvider, Rapport } from '../../providers/rapport/rapport';
import { EditRapportPage } from '../edit-rapport/edit-rapport';


@Component({
  selector: 'page-gestion-rapport',
  templateUrl: 'gestion-rapport.html',
})
export class GestionRapportPage {
  rapports:any []= [];
  searchDate: Date = null;
 
  
  constructor(public navCtrl: NavController, 
              public toast:ToastController,
              private rapportProvider: RapportProvider, 
            ) {  }

  
  ionViewDidLoad() {
    this.getAllRapports();
  }
  getAllRapports(){
    this.rapportProvider.getAll(this.searchDate)
    .then((result:any [])=>{
      this.rapports= result;
    });
  }

  addRapport(){
    this.navCtrl.push('ModifierRapprotPage');
  }

  editRapport(idRap: number){
    this.navCtrl.push('ModifierRapportPage', {idRap: idRap});
  }

  removeRapport(rapport: Rapport){
    this.rapportProvider.remove(rapport.idRap)
    .then(() => {
      var index = this.rapports.indexOf(rapport);
       this.rapports.splice(index, 1);
       this.toast.create({ message: 'rapport removed.', duration: 3000, position: 'botton' }).present();
     })
 }

filterRapports(ev: any) {
   this.getAllRapports();
 }

}//fermeture de la class

