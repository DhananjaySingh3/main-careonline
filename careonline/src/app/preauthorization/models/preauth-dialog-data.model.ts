import { PreAuthReadResponse } from './read-pre-auth.model';

export class DialogData {
    heading: string;
    messageContent: string;
    selectedPatientData: PreAuthReadResponse;
}
