import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { SupportCase } from '../../models/support-case';
import { ColDef, GridCoreModule, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  isJqueryWorking: any;
  table!: any;
  table2!: any;
  showModel = '';
  supportCases$!: Observable<any>;
  gridApi: any;
  columnDefs: ColDef[] = [
    { field: 'TrackingNumber' },
    { field: 'Type' },
    { field: 'Description' },
    {
      field: 'CreatedOn',
      filter: 'agDateColumnFilter',
      sortingOrder: ['desc', 'asc'],
    },
    {
      field: 'Status',
      cellRenderer: (param: ICellRendererParams) => {
        switch (param.value.toLocaleLowerCase()) {
          case status.COMPLETE.toLocaleLowerCase():
            return ` <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">${param.value}</span>`;
          case status.PROBLEMSOLVED.toLocaleLowerCase():
            return ` <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">${param.value}</span>`;
          case status.INPROGRESS.toLocaleLowerCase():
            return `<span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">${param.value}</span>`;
          case status.HOLDON.toLocaleLowerCase():
            return `<span class="bg-yellow-100 text-red-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.WAITINGFORDETAILS.toLocaleLowerCase():
            return `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.RESEARCHING.toLocaleLowerCase():
            return `<span class="bg-yellow-300 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.PENDING.toLocaleLowerCase():
            return `<span class="bg-yellow-600 text-yellow-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.INFORMATIONPROVIDED.toLocaleLowerCase():
            return `<span class="bg-blue-400 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.CANCELLED.toLocaleLowerCase():
            return `<span class="bg-gray-400 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          case status.MERGED.toLocaleLowerCase():
            return `<span class="bg-yellow-200 text-yellow-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">${param.value}</span>`;
          default:
            return ` <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">${param.value}</span>
`;
            break;
        }
      },
    },
  ];

  gridOptions: GridOptions<SupportCase> = {
    columnDefs: this.columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
    },

    onGridReady: (event: GridReadyEvent) => {
      // use api from event
      this.gridApi = event.api;
    },
  };
  rowData: SupportCase[] = [];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  /**
   *
   */
  constructor(supportCasesService: CasesService) {
    this.supportCases$ = supportCasesService.getSupportCases();
    this.supportCases$.subscribe({
      next: (res) => {
        this.rowData = <SupportCase[]>res.Cases;
        //console.log(this.rowData)
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  ngOnInit(): void {}
  newCaseShowModel() {
    //console.log('show mdoel clicked');
  }

  clearFilters() {
    // if (this.gridOptions)
    // {
    //   this.gridOptions.api?.setFilterModel(null);
    // }

    if (this.gridApi) {
      this.gridApi?.setFilterModel(null);
    }
  }
}

enum status {
  COMPLETE = 'Complete',
  INPROGRESS = 'In Progress',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  INFORMATIONPROVIDED = 'Information Provided',
  PROBLEMSOLVED = 'Problem Solved',
  HOLDON = 'Pending',
  RESEARCHING = 'Pending',
  WAITINGFORDETAILS = 'Pending',
  MERGED = 'Merged',
}


