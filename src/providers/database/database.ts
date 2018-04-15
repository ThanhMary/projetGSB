import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
constructor(private sqlite: SQLite) {
     }
  // get  la base de donnée générale
  public getDB(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'gsb.db',
      location: 'default'
    });
  }
  // creation de la base de donnée
public createDatabase() {
  return this.getDB()
    .then((db: SQLiteObject) => {
      // Creer des tables
      this.createTables(db);

      // Inserrer des items par défauts
      this.insertDefaultItemsType(db);

      this.insertDefaultItemsFamilleMed(db);
    })
    .catch(e => console.log(e));
}

private createTables(db: SQLiteObject) {
  // création des tables 
  db.sqlBatch([
    //praticien et type de praticien (typeID est la cle etrangère dans la table praticiens)
    ['CREATE TABLE IF NOT EXISTS typePraticiens (idType Text primary key AUTOINCREMENT NOT NULL, libelle TEXT)'],
    ['CREATE TABLE IF NOT EXISTS praticiens (idPra integer primary key AUTOINCREMENT NOT NULL, nom TEXT, prenom TEXT, adresse TEXT, tel integer, departement TEXT, specialitePlus TEXT, active integer, typeID integer, FOREIGN KEY(typeID) REFERENCES typePraticiens(idType))'],
    
    //medicaments et sa famille (idFamille est la clé etrangere dans la table medicaments)
    ['CREATE TABLE IF NOT EXISTS familleMed (idFamille Text primary key  NOT NULL, libelle TEXT)'],
    ['CREATE TABLE IF NOT EXISTS medicaments (idMed integer primary key AUTOINCREMENT NOT NULL, nomCommercial TEXT, composition TEXT, effets TEXT,contreIndication TEXT, active integer, familleID integer, FOREIGN KEY(familleID) REFERENCES familleMed(idFamille))'],
      
    //table des rapports (praticienID et medID sont deux cles etrangeres dans la table rapports)
    ['CREATE TABLE IF NOT EXISTS rapports (idRap integer primary key AUTOINCREMENT NOT NULL, rdate Text, motif Text, bilan Text, active integer, praID integer, medID interger, FOREIGN KEY(praID) REFERENCES praticiens(idPra), FOREIGN KEY(medID) REFERENCES medicaments(idMed))'],
  
    //table utilisateur
    ['CREATE TABLE IF NOT EXISTS utilisateur (idUser Text, nom Text, prenom Text, login Text, password Text, adresse Text, CodePostale Text, dateEmbauche Text)']

  ])
    .then(() => console.log('Tables créées'))
    .catch(e => console.error('Erreur', e));
}

private insertDefaultItemsType(db: SQLiteObject) {
  db.executeSql('Select COUNT(idType) as qtd from typePraticiens', {})
   .then ((data: any) =>{
     if(data.rows.item(0).qtd== 0){

       return db.sqlBatch([
        ['insert into typePraticiens (libelle) values (?)', ['Medecin']],
        ['insert into typePraticiens (libelle) values (?)', ['Pharmacien']],
        ['insert into typePraticiens (libelle) values (?)', ['Chef de Clinique']],
        ['insert into typePraticiens (libelle) values (?)', ['Autre']]
      ])
        .then(() => console.log('data inserrée!'))
        .catch(e => console.error('Erreur', e));
     }
   })
   .catch (e=>console.error('erreur de consultation de quantite de typePraticien'));
  }


private insertDefaultItemsFamilleMed(db: SQLiteObject) {
  db.executeSql('Select COUNT(idMed) as qtd from medicaments', {})
  .then ((data: any) =>{
    if(data.rows.item(0).qtd== 0){

      return db.sqlBatch([
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['AA','Antalgiques en association']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['AAA','Antalgiques antipyréques en association']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['AAC','Antidépresseur d action centrale']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['AAH','Antivertigineux antihistaminique H1']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['ABA','Antibiotique antituberculeux']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['ABC','Antibiotique antiacnénique local']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['ABP','Antibiotique de la famille des béta-lactamines -pénicilline']],
        ['insert into familleMed (idFamille, libelle) values (?,?)', ['AFC','Antibiotique de la famille des cyclines']]
      ])
      .then(() => console.log('data inserrée!'))
      .catch(e => console.error('Erreur', e));
    }
  })
  .catch (e=>console.error('erreur de consultation de quantite de familleMed'));
 }
}