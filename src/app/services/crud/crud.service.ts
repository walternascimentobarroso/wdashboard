import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";

@Injectable()
export class CrudService {
    constructor(private db: AngularFireDatabase) { }

    getAll(path: string) {
        return this.db
            .list(path)
            .snapshotChanges()
            .pipe(map(changes =>
                changes.map(a => {
                    return { key: a.payload.key, ...a.payload.val() };
                })
            ));
    }

    get(path: string, key) {
        return this.db
            .object(path +"/"+ key)
            .snapshotChanges()
            .pipe(map(c => {
                return { key: c.key, ...c.payload.val() };
            }));
    }

    create(path: string, data) {
        return this.db.list(path).push(data);
    }

    update(path: string, key, data) {
        this.db.list(path).update(key, data);
    }

    delete(path: string, id: string) {
        return this.db.list(path).remove(id);
    }
}
