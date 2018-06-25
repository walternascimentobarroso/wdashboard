import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CrudService } from "../../services/crud/crud.service";
import { ActivatedRoute, Router } from "@angular/router";

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

    constructor(
        private crudservice: CrudService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe(params => {
            this.key = params["key"];
            this.form = new FormGroup({
                responsible: new FormControl(params["responsible"]),
                equipment: new FormControl(params["equipment"]),
                owner: new FormControl(params["owner"]),
                hometype: new FormControl(params["hometype"]),
                cep: new FormControl(params["cep"]),
                number: new FormControl(params["number"]),
                neighborhood: new FormControl(params["neighborhood"]),
                street: new FormControl(params["street"]),
                email: new FormControl(params["email"]),
                phone: new FormControl(params["phone"])
            });
        });
    }

    onSubmit(): void {
        this.form = {
            responsible: this.form.get("responsible").value,
            cep: this.form.get("cep").value,
            email: this.form.get("email").value,
            equipment: this.form.get("equipment").value,
            hometype: this.form.get("hometype").value,
            neighborhood: this.form.get("neighborhood").value,
            number: this.form.get("number").value,
            owner: this.form.get("owner").value,
            phone: this.form.get("phone").value,
            street: this.form.get("street").value
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
