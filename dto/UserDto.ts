import { ObjectId } from "mongodb";

export default class UsetDto {
    public id: ObjectId;
    public email: string;
    public login: string;
    public registrationDate: Date;
    constructor(id: ObjectId, email: string, login: string, registrationDate: Date) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.registrationDate = registrationDate;
    }
}