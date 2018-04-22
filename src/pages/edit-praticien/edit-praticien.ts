import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category'
import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';

@Component({
  selector: 'page-edit-praticien',
  templateUrl: 'edit-praticien.html',
})
export class EditPraticienPage {
  model: Praticien;
  categories: any [];
  
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private praticienProvider: PraticienProvider,
    private categoryProvider: CategoryProvider
  ) {
 
    this.model = new Praticien();
     if (this.navParams.data.id) {
      this.praticienProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
 
  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
      this.categoryProvider.getAll()
      .then((result: any[]) => {
        this.categories = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur de get des categories.', duration: 3000, position: 'botton' }).present();
      });

    }
 
  save() {
    this.savePraticien()
      .then(() => {
        this.toast.create({ message: 'Praticien saved.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private savePraticien() {
    if (this.model.id) {
      return this.praticienProvider.update(this.model);
    } else {
      return this.praticienProvider.insert(this.model);
    }
  }
 
}