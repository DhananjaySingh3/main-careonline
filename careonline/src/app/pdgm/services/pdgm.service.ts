import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientFormDataRequest, ResponseReceivedForm } from '../../eligibility-check/models/patient-data.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PDGMService {
  formData: PatientFormDataRequest;
  readonly apiURL = 'http://localhost:8080/pdgm';

  constructor(
    private httpClient: HttpClient,

  ) { }

  getPdgmList(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/rapList');
  }

  getPdgmToolData(request): Observable<any> {
    return this.httpClient.post(this.apiURL + '/pdgmTool', request);
  }
  
saveOasisDetailsData(request): Observable<any> {
  return this.httpClient.post(this.apiURL + '/pdgmToolPosition3', request)
}

getOasisDetailpart1(){
  return  {
    oasisCode: "M1033",
    oasisQuestion: "Risk for hospitalization : Which of the following signs or Symptoms characterise this patient as at risk for hospitalisation ? (Mark all that apply)",
    functionalPoint: "Functional Point",
    oasisOptions: [{
      id: 1,
      flag: false,
      description: "1. History of falls (2 or more falls - or any fall with an injury - in the past 12 months)",
      functionalPoint: null,
    }, {
      id: 2,
      flag: false,
      description: "2. Unintentional weight loss of a total of 10 pounds or more in the past 12 months",
      functionalPoint: null,
    }, {
      id: 3,
      flag: false,
      description: "3. Multiple hospitalizations (2 or more) in the past 6 months",
      functionalPoint: null,
    }, {
      id: 4,
      flag: false,
      description: "4. Multiple emergency department visits (2 or more) in the past 6 months",
      functionalPoint: null,
    }, {
      id: 5,
      flag: false,
      description: "5. Declain in mental, emotional or behavioural status in the past 3 months",
      functionalPoint: null,
    }, {
      id: 6,
      flag: false,
      description: "6. Reported are observed history of difficulty complying with any medical instructions (for example medications, diet, exercise) in the past 3 months",
      functionalPoint: null,
    }, {
      id: 7,
      flag: false,
      description: "7. Currently taking 5 or more medications",
      functionalPoint: null,
    }, {
      id: 8,
      flag: false,
      description: "8. Currently reports exhaustion",
      functionalPoint: null,
    }, {
      id: 9,
      flag: false,
      description: "9. Other risk(s) not listed in 1-8",
      functionalPoint: null,
    }, {
      id: 10,
      flag: false,
      description: "10. None of the above",
      functionalPoint: null,
    }]
  }
}
getM1800OasisOptions(){
  return   {
    oasisCode: "M1800",
    oasisQuestion: "Grooming: Current ability to tend safely to personal hygenie needs (i.e washing face and hands, hair care, shaving or makeup, teeth or denture care, fingernail care)",
    functionalPoint: "Functional Point",
    oasisOptions: [{
      id: 0,
      flag: 0,
      description: "0. Able to groom self unaided, with or without the use of assistive device or adapted methods.",
      functionalPoint: null,
    }, {
      id: 1,
      flag: 1,
      description: "1. Grooming utensils must be placed within reach before able to complete grooming activities",
      functionalPoint: null,
    }, {
      id: 2,
      flag: 2,
      description: "2. Someone must assist the patient to groom self",
      functionalPoint: null,
    }, {
      id: 3,
      flag: 3,
      description: "3. Patient depends entirely upon someone else for grooming needs",
      functionalPoint: null,
    }]
  }
}
getM1810OasisOptions(){
  return {
    oasisCode: "M1810",
    oasisQuestion: "Current ability to dress upper body safely (wit or without dressing aids) including undergarments,pullovers,front opening shirts and blouses, managing zippers, buttons and snaps",
    functionalPoint: "Functional Point",
    oasisOptions: [{
      id: 0,
      flag: false,
      description: "0. Able to get clothes out of closets and drawers, put them on or remove them from the upper body without assistance",
      functionalPoint: null,
    }, {
      id: 1,
      flag: false,
      description: "1. Able to dress upperbody without assistance if clothing is laid out or handed to the patient",
      functionalPoint: null,
    }, {
      id: 2,
      flag: false,
      description: "2. Someone must help the patient put on upperbody clothing",
      functionalPoint: null,
    }, {
      id: 3,
      flag: false,
      description: "3. Patient depends entirely upon another person to dress the upperbody",
      functionalPoint: null,
    }]
  }
}
getM1820OasisOptions(){
return   {
  oasisCode: "M1820",
  oasisQuestion: "Bathing: Current ability to dress lower body safely(with or without dressing aids), including undrgarments,slacks,socks or nylons, shoes",
  functionalPoint: "Functional Point",
  oasisOptions: [{
    id: 0,
    flag: false,
    description: "0. Able to obtain, put on and removing clothing and shoes without assistance.",
    functionalPoint: null,
  }, {
    id: 1,
    flag: false,
    description: "1. Able to dress lowerbody without assistance if clothing is laid out or handed to the patient",
    functionalPoint: null
  }, {
    id: 2,
    flag: false,
    description: "2. Someone must help the patient put on undergarments,slacks,socks or nylons and shoes",
    functionalPoint: null
  }, {
    id: 3,
    flag: false,
    description: "3. Patient depends entirely upon another person to dress the lowerbody",
    functionalPoint: null
  }]
}
}
getM1830OasisOptions(){
return{
  oasisCode: "M1830",
  oasisQuestion: "Bathing: Current ability to wash entire body safely. Excludes grooming (Washing face, washing hands and shampooing hair)",
  functionalPoint: "Functional Point",
  oasisOptions: [{
    id: 0,
    flag: false,
    description: "0. Able to bath self in shower or tub independently, including getting in and out of tub/shower",
    functionalPoint: null
  }, {
    id: 1,
    flag: false,
    description: "1. With the use of devices, is able to bathe self in shower  or tub independently, including getting in and out of tub/shower",
    functionalPoint: null
  }, {
    id: 2,
    flag: false,
    description: "2. Able to bathe in shower or tub with the intermittent assistance of another person(a) for intermittent supervision or encouragement or reminders , OR (b) to get in or out of the shower or tub OR (C) for washing difficult to reach areas",
    functionalPoint: null
  }, {
    id: 3,
    flag: false,
    description: "3. Able to participate in bathing self in shower or tub, but requires presence of another person throughtout the bath for assistance or supervision.",
    functionalPoint: null
  },
  {
    id: 4,
    flag: false,
    description: "4. Unable to use the shower or tub, but able to bathe self independently with or without the use devices at the sink, or in chair, or on commode.",
    functionalPoint: null
  },
  {
    id: 5,
    flag: false,
    description: "5. Unable to use the shower or tub, but able to participate in bathing self in bed, at the sink, in bedside chair, or on commode, with the assistance or supervision of another person  throughout the bath.",
    functionalPoint: null
  }, {
    id: 6,
    flag: false,
    description: "6. Unable to participate effectively in bathing and is bathed totally by another person.",
    functionalPoint: null
  }]
}
}
getM1840OasisOptions(){
return {
  oasisCode: "M1840",
  oasisQuestion: "Toilet transferring: Current ability to get to and from the toilet or bedside commode safely and transfer on and off toilet/commode.",
  functionalPoint: "Functional Point",
  oasisOptions: [{
    id: 0,
    flag: false,
    description: "0. Able to get to and from the toilet and transfer independently with or without a device",
    functionalPoint: null
  }, {
    id: 1,
    flag: false,
    description: "1. When reminded, assisted, or supervised by another person, able to get to and from the toilet and transfer",
    functionalPoint: null
  }, {
    id: 2,
    flag: false,
    description: "2. Unable to get to and from the toilet but is able to use a bedside commode(with or without assistance)",
    functionalPoint: null
  }, {
    id: 3,
    flag: false,
    description: "3. Unable to get to and from the toilet or bedside commode but is able to use a bedpan/urinal independently",
    functionalPoint: null
  }]
}
}
getM1860OasisOptions() {
    return  {
      oasisCode: "M1860",
      oasisQuestion: "Ambulance/Locomotion: Current ability to walk safely, once in a standing position, or use a wheelchair, once in a seated position, on a variety of surfaces.",
      functionalPoint: "Functional Point",
      oasisOptions: [{
        id: 0,
        flag: false,
        description: "0. Able to idependently walk on even and uneven surfaces and negotiate stairs with or without railings(i.e needs to human assistance or assistive device).",
        functionalPoint: null
      }, {
        id: 1,
        flag: false,
        description: "1. With the use of a one-handed device (e.g cane, single crutch, hemi-walker), able to independently walk on even and uneven surfaces and negotiate stairs with or without railings.",
        functionalPoint: null
      }, {
        id: 2,
        flag: false,
        description: "2. Requires use of a two-handed devices(e.g walker or crutches) to walk alone on a level surface and/or requires human supervision or assistance to negotiate stairs or steps or uneven surfaces.",
        functionalPoint: null
      }, {
        id: 3,
        flag: false,
        description: "3. Able to walk only with the supervision or assistance of another person at all times.",
        functionalPoint: null
      }, {
        id: 4,
        flag: false,
        description: "4. Chairfast, unable to ambulate but is able to wheel self independently.",
        functionalPoint: null
      }, {
        id: 5,
        flag: false,
        description: "5. Chairfast, unable to ambulate and is unable to wheel self.",
        functionalPoint: null
      }, {
        id: 6,
        flag: false,
        description: "6. Bedfast, Unable to ambulate or be up in a chair.",
        functionalPoint: null
      }]
    }
  }


}
