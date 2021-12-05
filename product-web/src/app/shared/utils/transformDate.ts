export class TransformDate {
    static getHumanDate(value:string){
        let data = value.split('T')
        return data[0];
    }
}