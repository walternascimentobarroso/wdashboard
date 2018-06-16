import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';

@Component({
    selector: 'my-table',
    templateUrl: './my-table.component.html'
})
export class MyTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MyTableDataSource;
    data = [
        { key: '2', name: 'Helium' }
    ];

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['key', 'name', 'action'];

    ngOnInit() {
        this.dataSource = new MyTableDataSource(this.paginator, this.sort, this.data);
    }
}
