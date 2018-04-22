import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RapportProvider, Rapport } from '../../providers/rapport/rapport'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rapports: any[] = [];
  onlyInactives: boolean = false;
  searchDate: Date = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private rapportProvider: RapportProvider) { }

  ionViewDidEnter() {
    this.getAllRapports();
  }

  getAllRapports() {
    this.rapportProvider.getAll(!this.onlyInactives, this.searchDate)
      .then((result: any[]) => {
        this.rapports = result;
      });
  }

  addRapport() {
    this.navCtrl.push('EditRapportPage');
  }

  editRapport(id: number) {
    this.navCtrl.push('EditRapportPage', { id: id });
  }

  removeRapport(rapport: Rapport) {
    this.rapportProvider.remove(rapport.id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.rapports.indexOf(rapport);
        this.rapports.splice(index, 1);
        this.toast.create({ message: 'rapport est supprimé.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterRapports(ev: any) {
    this.getAllRapports();
  }

}