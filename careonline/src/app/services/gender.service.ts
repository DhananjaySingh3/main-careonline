import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  /*
  genderList: AngularFireList<any>;
  genderListArray = [];


  constructor(private firebaseService: AngularFireDatabase) {
    this.genderList = this.firebaseService.list('genders');
    this.genderList.snapshotChanges().subscribe(gendersData => {
      this.genderListArray = gendersData.map((items) => {
        return {
          $key: items.key,
          // below payload has id and name values
          ...items.payload.val()
        };
      });
    });
  }

  // Alternative method for getting gender
  // getGenderName($key) {
  //   if ($key === 0) {
  //     return '';
  //   } else {
  //     // Lodash methods
  //     return _.find(this.genderListArray, (searchObj) => {
  //       return searchObj.$key === $key;
  //     }).name;    }
  // }
*/

}
