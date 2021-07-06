import { Component, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Messagemqtt } from '../models/message';
import { TableService } from '../services/table.service';
import { Tables } from '../models/table';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'app-tables',
    templateUrl: '../views/table.component.html',
    styleUrls: ['../styles/table.component.scss'],
})

export class TableComponent implements OnInit {

    public dataToTable = [];
    public tables;
    public table;
    public datas = [];
    public titleTable;
    public displayDelete = false;
    public idTableToDelete;
    public projectId;
    public msg: Message[] = [];

    constructor(
        private tableService: TableService,
        private cd: ChangeDetectorRef,
        private router: Router) { }

    ngOnInit() {
        const link = this.router.url;
        this.projectId = link.replace('/dashboard/', '');
        this.tables = [];
    }

    /**
     *
     * @param severity  success, info, warn, error
     * @param title
     * @param message
     */
    showToast(severity, title, message) {
        this.msg = [];
        this.msg.push({ severity: severity, summary: title, detail: message });
    }

    /**
     * Crear una tabla.
     * @param array Arreglo con los datos necesarios para crear una tabla.
     */
    setArrayTable(array) {

        this.tables = [];
        let dates = [];
        let i = 0;
        const j = 0;

        for (i = 0; i < array.length; i++) {
            this.datas = array[i].datas;
            dates = array[i].dates;
            const table = new Tables(array[i].id,
                array[i].project, array[i].user, array[i].datas,
                array[i].dates, array[i].title);

            this.tables.push(table);

        }
        this.cd.detectChanges();
    }

    /**
     * Crear una tabla.
     * @param array Arreglo con los datos para tabular.
     */
    createTable(array) {
        for (let i = 0; i < array.length; i++) {
            this.titleTable = array[i].title;
        }
    }

    showDialogDeleteTable(index) {
        this.idTableToDelete = this.tables[index].id;
        this.displayDelete = true;
    }

    /**
     * Obtener las tablas.
     */
    getAllTables() {

        this.tableService.getTableByProject(this.projectId).subscribe(data1 => {
            this.tables = [];
            const dataArray = data1.table;
            for (const data in dataArray) {
                if (dataArray.hasOwnProperty(data)) {
                    const tableObj = new Tables(dataArray[data]._id,
                        dataArray[data].project, dataArray[data].user,
                        dataArray[data].datas, dataArray[data].dates, dataArray[data].title);

                    this.tables.push(tableObj);
                }
            }
            this.tables.reverse();
        }, Error => {
            this.showToast('error', 'Error', 'Error al consultar las tablas.');
        })
    }

    /**
     * Eliminar tabla.
     */
    deleteTable() {
        this.tableService.deleteTableById(this.idTableToDelete).subscribe(data => {
            this.displayDelete = false;
            this.showToast('success', 'Eliminada', 'Tabla eliminada exitosamente.');
            this.getAllTables();
        }, Error => {
            this.showToast('error', 'Error', 'Error al eliminar la tabla.');
            this.displayDelete = false;
        });
    }

}
