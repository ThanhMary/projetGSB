import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
@Injectable()
export class DatabaseProvider {
 
  constructor(private sqlite: SQLite) { }
 
  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'gsbdata.db',
      location: 'default'
    });
  }
 
  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
        // Inserindo dados padrão
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }
 
  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS praticiens (id integer primary key AUTOINCREMENT NOT NULL, nom TEXT, prenom REAL, adresse TEXT, departement TEXT, tel TEXT, specialitePlus TEXT, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))'],
      ['CREATE TABLE IF NOT EXISTS rapports (id integer primary key AUTOINCREMENT NOT NULL, rdate DATE, motif TEXT, bilan TEXT, medicament TEXT, nbEchantillon integer, active integer, praID integer, FOREIGN KEY(praID) REFERENCES praticiens(id))'],
      ['CREATE TABLE IF NOT EXISTS familleMed (idFamille Text primary key NOT NULL, libelle TEXT)'],
      ['CREATE TABLE IF NOT EXISTS medicaments (idMed integer primary key AUTOINCREMENT NOT NULL, nomCommercial TEXT, composition TEXT, effets TEXT,contreIndication TEXT, active integer, familleID integer, FOREIGN KEY(familleID) REFERENCES familleMed(idFamille))'],
      ['CREATE TABLE IF NOT EXISTS users (idUser Text, nom Text, prenom Text, login Text, password Text, adresse Text, CodePostale Text, dateEmbauche Text)']
    ])
      .then(() => console.log('Tables créées'))
      .catch(e => console.error('Erreur de la creation des tables', e));
  }
 
  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
 
      if (data.rows.item(0).qtd == 0) {
 
     
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Medecin']],
          ['insert into categories (name) values (?)', ['Pharmacien']],
          ['insert into categories (name) values (?)', ['Chef de clinique']],
          ['insert into categories (name) values (?)', ['Autre']]
        ])
          .then(() => console.log('Data par defaut inserre'))
          .catch(e => console.error('Erreur', e));
 
      }
    })
    .catch(e => console.error('Erreur de consulter la qtd de categories', e));
  }
}


// import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
// @Injectable()
// export class DatabaseProvider {
 
//   constructor(private sqlite: SQLite) { }
   
//   public getDB() {
//     return this.sqlite.create({
//       name: 'dataGSB.db',
//       location: 'default'
//     });
//   }
 
//   public createDatabase() {
//     return this.getDB()
//       .then((db: SQLiteObject) => {
 
//         this.createTables(db);
       
//         this.insertDefaultItems(db);
 
//       })
//       .catch(e => console.log(e));
//   }
 
//   /**
//    * 
//    * @param db
//    */
//   private createTables(db: SQLiteObject) {
   
//     db.sqlBatch([
//       ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
//       ['CREATE TABLE IF NOT EXISTS praticiens (id integer primary key AUTOINCREMENT NOT NULL, nom TEXT, prenom REAL, adresse TEXT, departement TEXT, tel TEXT, specialitePlus TEXT, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))'],
//       ['CREATE TABLE IF NOT EXISTS rapports (idRap integer primary key AUTOINCREMENT NOT NULL, rdate DATE, motif TEXT, bilan TEXT, medicament TEXT, nbEchantillon integer, active integer, praID integer, FOREIGN KEY(praID) REFERENCES praticiens(id))'],
//       ['CREATE TABLE IF NOT EXISTS familleMed (idFamille Text primary key NOT NULL, libelle TEXT)'],
//       ['CREATE TABLE IF NOT EXISTS medicaments (idMed integer primary key AUTOINCREMENT NOT NULL, nomCommercial TEXT, composition TEXT, effets TEXT,contreIndication TEXT, active integer, familleID integer, FOREIGN KEY(familleID) REFERENCES familleMed(idFamille))'],
//       ['CREATE TABLE IF NOT EXISTS users (idUser Text, nom Text, prenom Text, login Text, password Text, adresse Text, CodePostale Text, dateEmbauche Text)']
//     ])
//       .then(() => console.log('Tables créées'))
//       .catch(e => console.error('Erreur lors de la crétation des tables', e));
//   }
 
//   /**
 
//    * @param db
//    */
//   private insertDefaultItems(db: SQLiteObject) {
//     db.executeSql('select COUNT(id) as qtd from categories', {})
//     .then((data: any) => {
     
//       if (data.rows.item(0).qtd == 0) {
       
//         db.sqlBatch([
//           ['insert into categories (name) values (?)', ['Medecin']],
//           ['insert into categories (name) values (?)', ['Pharmacien']],
//           ['insert into categories (name) values (?)', ['Chef de Clinique']],
//           ['insert into categories (name) values (?)', ['Autre']]
//         ])
//           .then(() => console.log('Data est inseré'))
//           .catch(e => console.error('Erreur', e));
 
//       }
//     })
//     .catch(e => console.error('Erreur de consultation de la qtd de categories', e));
//   }
// }



















