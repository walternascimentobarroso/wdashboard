import { Component, OnInit, Input, Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import * as jsPDF from "jspdf";
import { saveAs } from "file-saver/FileSaver";

@Component({
    selector: "app-bottom-sheet",
    templateUrl: "./bottom-sheet.component.html",
    styleUrls: ["./bottom-sheet.component.css"]
})
export class BottomSheetComponent implements OnInit {
    @Input() data: string;
    constructor(private bottomSheet: MatBottomSheet) {}

    openBottomSheet(): void {
        // var table = this.json2table(this.data);
        let dados: any = this.data;
        var element = "";
        let parte1 = `
        <h1>Relatório</h1>

        <h3>Responsável e Cliente</h3>
        <p><strong>Responsável: </strong><span> ${dados.responsible} </span></p>
        <p><strong>Proprietário: </strong><span>  ${dados.owner} </span></p>
        <p><strong>Tipo de Casa: </strong><span> ${dados.hometype} </span></p>

        <h3>Endereço do proprietário</h3>
        <p><strong> CEP: </strong> <span> ${dados.cep} </span></p>
        <p><strong> Rua: </strong><span> ${dados.street} </span></p>
        <p><strong> Nº: </strong><span> ${dados.number} </span></p>
        <p><strong> Bairro: </strong><span> ${dados.neighborhood} </span></p>

        <h3>Contato do proprietário</h3>
        <p><strong> Email: </strong><span> ${dados.email} </span></p>
        <p><strong> Telefone: </strong><span> ${dados.phone} </span></p>
        `;
        let newetapa2;
        for (var key in dados.etapa2) {
            newetapa2 = dados.etapa2[key];
        }

        let parte2 = `
        <h3>Equipamento usado no relatório</h3>
        <p><strong> Equipamento: </strong><span> ${dados.equipment} </span></p>
        <p><strong> Titulo: </strong><span> ${newetapa2.title} </span></p>
        <p><strong> Nome: </strong><span> ${newetapa2.name} </span></p>
        <p><strong> Endereço: </strong><span> ${newetapa2.adress} </span></p>
        <p><strong> Observações: </strong><span> ${newetapa2.obs} </span></p>

        <h3>Imagens</h3>
        `;
        let parte2img = "";
        for (var key in newetapa2) {
            if (key == "file") {
                let file = newetapa2[key];
                for (var key in file) {
                    parte2img += `
                        <img src="${file[key].nameimg}">
                        <span>${file[key].obs}<span>
                    `;
                }
            }
        }

        element = parte1 + parte2 + parte2img;
        this.bottomSheet.open(BottomSheetShow, { data: element });
    }

    // openBottomSheet(): void {
    //     var table = this.json2table(this.data);
    //     this.bottomSheet.open(BottomSheetShow, { data: table });
    // }

    json2table(json) {
        var cols = Object.keys(json[0]),
            headerRow = "",
            bodyRows = "";

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        cols.map(function(col) {
            headerRow += "<th>" + capitalizeFirstLetter(col) + "</th>";
        });

        json.map(function(row) {
            bodyRows += "<tr>";

            cols.map(function(colName) {
                bodyRows += "<td>" + row[colName] + "</td>";
            });

            bodyRows += "</tr>";
        });

        let table = `<table>
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows}</tbody>
        </table>`;

        return table;
    }

    ngOnInit() {}
}

@Component({
    selector: "bottom-sheet-show",
    templateUrl: "bottom-sheet-show.html"
})
export class BottomSheetShow {
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetShow>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public source: any
    ) {}

    pdf(event: MouseEvent): void {
        var pdf = new jsPDF("p", "pt", "letter");

        let specialElementHandlers = {
            "#bypassme": function(element, renderer) {
                return true;
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
            margins.top,
            {
                width: margins.width,
                elementHandlers: specialElementHandlers
            },

            function(dispose) {
                pdf.save("report.pdf");
            },
            margins
        );

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    xls(event: MouseEvent): void {
        var blob = new Blob([this.source], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "report.xls");

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    docx(event: MouseEvent): void {
        var blob = new Blob([this.source], {
            type:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
        });
        saveAs(blob, "report.docx");

        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
