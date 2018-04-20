import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {LOCALE_ID} from '@angular/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccueilPage } from '../pages/accueil/accueil';

import { EditPraticienPage } from '../pages/edit-praticien/edit-praticien';
import { EditMedicamentPage } from '../pages/edit-medicament/edit-medicament';
import { EditRapportPage } from '../pages/edit-rapport/edit-rapport';

import { GestionPraticienPage } from '../pages/gestion-praticien/gestion-praticien';
import { GestionRapportPage } from '../pages/gestion-rapport/gestion-rapport';
import { GestionMedicamentPage } from '../pages/gestion-medicament/gestion-medicament';
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { PraticienProvider } from '../providers/praticien/praticien';
import { MedicamentProvider } from '../providers/medicament/medicament';
import { RapportProvider } from '../providers/rapport/rapport';
import { CategoryProvider } from '../providers/category/category';

 
@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    AccueilPage,
    EditPraticienPage,
    EditMedicamentPage,
    EditRapportPage,
    GestionPraticienPage,
    GestionRapportPage,
    GestionMedicamentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    AccueilPage,

    EditPraticienPage,
    EditMedicamentPage,
    EditRapportPage,

    GestionPraticienPage,
    GestionRapportPage,
    GestionMedicamentPage

      ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    PraticienProvider,
    MedicamentProvider,
    RapportProvider,
    CategoryProvider
   
   
    
  ]
})
export class AppModule {
 }