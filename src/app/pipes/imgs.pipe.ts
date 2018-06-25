import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "imgs"
})
export class ImgsPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let keys = [];
        for (let key in value.file) {
            keys.push(value.file[key]);
        }
        return keys;
    }
}
