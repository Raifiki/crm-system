export class User {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: number;
    streetName: string;
    streetNumber: number;
    zipCode: number;
    city: string;
    eMail: string;

    constructor(obj?: any,id?:string){
        this.id = id || '';
        this.firstName = obj?.firstName || '';
        this.lastName = obj?.lastName || '';
        this.birthDate = obj?.birthDate || '';
        this.streetName = obj?.streetName || '';
        this.streetNumber = obj?.streetNumber || '';
        this.zipCode = obj?.zipCode || '';
        this.city = obj?.city || '';
        this.eMail = obj?.eMail || '';
    }

    toJSON(){
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            streetName: this.streetName,
            streetNumber: this.streetNumber,
            zipCode: this.zipCode,
            city: this.city,
            eMail: this.eMail,
        }
    }
}