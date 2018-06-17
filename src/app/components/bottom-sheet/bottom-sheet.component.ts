import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import * as jsPDF from "jspdf";
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {
    @Input() data: string;
    constructor(private bottomSheet: MatBottomSheet) { }

    openBottomSheet(): void {
        var table = this.json2table(this.data);
        this.bottomSheet.open(BottomSheetShow, { data: table });
    }

    json2table(json) {
        var cols = Object.keys(json[0]),
            headerRow = '',
            bodyRows = '';

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        cols.map(function (col) {
            headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
        });

        json.map(function (row) {
            bodyRows += '<tr>';

            cols.map(function (colName) {
                bodyRows += '<td>' + row[colName] + '</td>';
            });

            bodyRows += '</tr>';
        });

        let table = `<table>
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows}</tbody>
        </table>`;

        return table;
    }

    ngOnInit() {
    }

}

@Component({
    selector: 'bottom-sheet-show',
    templateUrl: 'bottom-sheet-show.html',
})
export class BottomSheetShow {

    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetShow>, @Inject(MAT_BOTTOM_SHEET_DATA) public source: any) { }

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
