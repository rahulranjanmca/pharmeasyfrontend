
import{AbstractEntity} from './../common/abstract.entity';
import {User} from './../common/user';
import {PatientPrescription} from './../patient-prescription/patient.prescription';
export class PendingPrescriptionRequest extends AbstractEntity {
        public id: number
        public user:User= new User();
        public userId:number;
        public type:string;
        public patientPrescription: PatientPrescription;
}