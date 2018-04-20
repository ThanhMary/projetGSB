import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { HomePage } from '../pages/home/home';
import { SQLite, SQLiteObject  } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
 
      //Creer la base de donnée
      dbProvider.createDatabase()
        .then(() => {
          // closing the SplashScreen only when the bank is created
          this.openHomePage(splashScreen);
        })
        .catch(() => {
          // or if there is an error in creating the database
          this.openHomePage(splashScreen);
        });
    });
  }
 
  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
  }
}

