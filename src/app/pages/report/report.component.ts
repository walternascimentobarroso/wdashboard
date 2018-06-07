import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
    @ViewChild("content") content: ElementRef;

    constructor() { }

    public downloadDOCX() {
        let source = `
            <table>
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
            </table>
        `;
        var blob = new Blob([source], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
        });
        saveAs(blob, "note.docx");
    }

    public downloadXLS() {
        let source = `
        <table>
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
        </table>
    `;
        var blob = new Blob([source], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    }

    public downloadPDF() {
        let pdf = new jsPDF();

        let specialElementHandlers = {
            "#bypassme": function (element, renderer) {
                return true;
            }
        };

        let content = this.content.nativeElement;

        pdf.fromHTML(content.innerHTML, 15, 15, {
            width: 190,
            elementHandlers: specialElementHandlers
        });

        pdf.save("test.pdf");
    }

    public export() {
        const pdf = new jsPDF("p", "pt", "a4");

        html2canvas(document.body).then(canvas => {
            pdf.fromHTML(document.body, 10, 10, { pagesplit: true }, () => {
                pdf.save("export.pdf");
            });
        });
    }

    public demoFromHTML() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        let source = `
        <table>
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
        </table>
    `;

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        let specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        let margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins);
    }

    ngOnInit() { }
}
