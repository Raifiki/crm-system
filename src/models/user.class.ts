export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    streetName: string;
    streetNumber: number;
    zipCode: number;
    city: string;

    constructor(obj?: any){
        this.firstName = obj? obj.firstName : '';
        this.lastName = obj? obj.lastName : '';
        this.birthDate = obj? obj.birthDate : '';
        this.streetName = obj? obj.streetName : '';
        this.streetNumber = obj? obj.streetNumber : '';
        this.zipCode = obj? obj.zipCode : '';
        this.city = obj? obj.city : '';
    }
}