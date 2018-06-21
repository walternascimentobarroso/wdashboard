import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable()
export class FileService {
    constructor(private storage: AngularFireStorage) {}

    randomNameFile(size, extension) {
        let alphanumber =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
            ramdom = "";
        for (var i = 0; i < size; i++) {
            var rnum = Math.floor(Math.random() * alphanumber.length);
            ramdom += alphanumber.substring(rnum, rnum + 1);
        }

        extension = extension.substring(extension.lastIndexOf(".") + 1);

        return ramdom + "." + extension;
    }

    upload(file, filePath) {
        return this.storage.upload(filePath, file);
    }

    show(name) {
        return this.storage.ref(name).getDownloadURL();
    }
}
