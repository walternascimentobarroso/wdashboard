import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";

@Injectable()
export class CrudService {
    constructor(private db: AngularFireDatabase) {}

    getAll(path: string) {
        return this.db
            .list(path)
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(a => {
                        return { key: a.payload.key, ...a.payload.val() };
                    })
                )
            );
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
