export class DateHelper {
    static padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
    }
    
    static formatDate(date: any) {
        return [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getYear() - 100,
        ].join('/');
    }
}