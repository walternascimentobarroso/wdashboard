import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';

@Component({
    selector: 'my-table',
    templateUrl: './my-table.component.html',
    styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MyTableDataSource;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'name'];

    ngOnInit() {
        this.paginator._intl.firstPageLabel = 'Primeira Página';
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.lastPageLabel = 'Última Página';
        this.paginator._intl.nextPageLabel = 'Próxima Página';
        this.paginator._intl.previousPageLabel = 'Página Anterior';
        this.dataSource = new MyTableDataSource(this.paginator, this.sort);
    }
}
