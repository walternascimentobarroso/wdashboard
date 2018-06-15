import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import * as jsPDF from "jspdf";
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

    constructor(private bottomSheet: MatBottomSheet) { }

    openBottomSheet(): void {
        this.bottomSheet.open(BottomSheetShow);
    }

    ngOnInit() {
    }

}

@Component({
    selector: 'bottom-sheet-show',
    templateUrl: 'bottom-sheet-show.html',
})
export class BottomSheetShow {
    source = `<table>
        <tr>
        <th>#</th>
        <th>Nome</th>
        </tr>
        <tr>
        <td>1</td>
        <td>Hydrogen</td>
        </tr>
        <tr>
        <td>2</td>
        <td>Helium</td>
        </tr>
        <tr>
        <td>3</td>
        <td>Lithium</td>
        </tr>
        <tr>
        <td>4</td>
        <td>Beryllium</td>
        </tr>
        <tr>
        <td>5</td>
        <td>Boron</td>
        </tr>
        <tr>
        <td>6</td>
        <td>Carbon</td>
        </tr>
        <tr>
        <td>7</td>
        <td>Nitrogen</td>
        </tr>
        <tr>
        <td>8</td>
        <td>Oxygen</td>
        </tr>
        <tr>
        <td>9</td>
        <td>Fluorine</td>
        </tr>
        <tr>
        <td>10</td>
        <td>Neon</td>
        </tr>
    </table>`;

    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetShow>) { }

    pdf(event: MouseEvent): void {
        var pdf = new jsPDF('p', 'pt', 'letter');

        let specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        let margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };

        pdf.fromHTML(
            this.source,
            margins.left,
            margins.top, {
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('report.pdf');
            }, margins);

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    xls(event: MouseEvent): void {
        var blob = new Blob([this.source], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "report.xls");

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    docx(event: MouseEvent): void {
        var blob = new Blob([this.source], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
        });
        saveAs(blob, "report.docx");

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
