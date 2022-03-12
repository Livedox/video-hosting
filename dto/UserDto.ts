import { ObjectId } from "mongodb";

export default class UsetDto {
    constructor(id: ObjectId, email: string, login: string, registrationDate: Date) {}
}