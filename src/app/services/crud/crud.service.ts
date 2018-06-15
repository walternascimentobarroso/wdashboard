import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class CrudService {
    constructor(private db: AngularFireDatabase) {}

    getAll(path: string) {
        // return this.db.list(path, ref => ref.orderByChild('name'))
        // .snapshotChanges()
        // .map(changes => {
        //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        // });

        return this.db.list(path).valueChanges();
    }

    get(path: string) {}

    create(path: string, data) {
        return this.db.list(path).push(data);
    }

    update(path: string) {}

    delete(path: string, id: string) {
        return this.db.list(path).remove(id);
    }
}
