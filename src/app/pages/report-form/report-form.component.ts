import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CrudService } from "../../services/crud/crud.service";
import { FileService } from "../../services/file/file.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
    selector: "app-report-form",
    templateUrl: "./report-form.component.html",
    styleUrls: ["./report-form.component.css"]
})
export class ReportFormComponent implements OnInit {
    private path = "reports";
    hide: boolean = true;
    report: any;
    key: any;
    form: any;

    hideUpload: boolean = false;
    uploadPercent: Observable<number>;
    profileUrl: Observable<string | null>;

    constructor(
        private crudservice: CrudService,
        private route: ActivatedRoute,
        private router: Router,
        private fileservice: FileService
    ) {
        this.route.params.subscribe(params => {
            this.key = params["key"];
            this.form = new FormGroup({
                responsible: new FormControl(params["responsible"]),
                equipment: new FormControl(params["equipment"]),
                owner: new FormControl(params["owner"])
            });
        });

        this.showFile("dFe2OO1CWb0EL1T.jpeg");
    }

    uploadFile(event) {
        this.hideUpload = true;
        const name = this.fileservice.randomNameFile(
            15,
            event.target.files[0].name
        );
        const task = this.fileservice.upload(event.target.files[0], name);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges()
            .pipe(finalize(() => (this.hideUpload = false)))
            .subscribe();
    }

    showFile(name) {
        this.profileUrl = this.fileservice.show(name);
    }

    onSubmit(): void {
        this.form = {
            responsible: this.form.get("responsible").value,
            equipment: this.form.get("equipment").value,
            owner: this.form.get("owner").value
        };

        if (this.key) {
            this.edit(this.form);
        } else {
            this.create(this.form);
        }
        this.router.navigate(["report"]);
    }

    create(data) {
        return this.crudservice.create(this.path, data);
    }

    edit(data) {
        return this.crudservice.update(this.path, this.key, data);
    }

    ngOnInit() {}
}
