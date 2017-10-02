
import{AbstractEntity} from './../common/abstract.entity';
import {User} from './../common/user';
export class PatientPrescription extends AbstractEntity {
        public id: number
        public user:User= new User();
        public userId:number;
        public type:string;
        public prescription:string;
}