import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrudService } from "../../services/crud/crud.service";

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {

    @Input() title: string;
    @Input() key: string;
    @Input() description: string;
    @Input() path: string;

    constructor(private crudservice: CrudService, public dialog: MatDialog) { }

    openDialog(): void {
        let dialogRef = this.dialog.open(DeleteDialogShow, {
            width: '300px',
            data: { key: this.key, title: this.title, path: this.path, description: this.description }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(this.path, result);
            }
        });
    }

    delete(path, key) {
        this.crudservice.delete(path, key);
    }

}

@Component({
    selector: 'app-delete-dialog-show',
    templateUrl: './delete-dialog-show.html'
})
export class DeleteDialogShow {

    constructor(
        public dialogRef: MatDialogRef<DeleteDialogShow>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
