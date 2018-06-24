import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imgs'
})
export class ImgsPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        console.log(value.file);
        let keys = [];
        for (let key in value.file) {
            console.log(value.file[key]);
            keys.push(value.file[key]);
        }
        console.log(keys);
        return keys;
    }

}
