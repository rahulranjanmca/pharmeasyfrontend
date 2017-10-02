import {AbstractEntity} from "./abstract.entity"
export class User extends AbstractEntity {
        public firstName: String;
        public lastName: string;
        public role:string;
        public email:string;
}