import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { TableConfig, conditions } from './customtable.interface';
import { EventConstants } from './events.constants';
import _ from 'lodash';

@Component({
  selector: 'customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {


  @Input() data: any[];
  @Input() config: TableConfig;
  @Input() totalRecords: number;
  @Output() onEvent = new EventEmitter();

  private startIndex: number;
  private endIndex: number;
  private allFields: any[];
  private sortableColumns: any[];
  private selectedData;
  private loading: boolean;

  constructor() { }

  ngOnInit() {
    this.loading = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['data']) {
      this.loading = false;
    }
    if (changes['config']) {
      // console.log("Config : ", this.config);
      this.sortableColumns = _.map(this.config.columns, col => col.sort == true ? col.field : "");
      // this.endIndex = this.config.recordsPerPage;
      this.allFields = _.map(this.config.columns, col => col.filter == true ? col.field : "");
      // console.log(" Sortable Columns : ", this.sortableColumns);
      // console.log(" All Filter Fields : ", this.allFields);
    }
    if (changes) {
      console.log("TABLE : ", this.totalRecords);
    }
  }


  getSortableFields(field: string) {
    if (!this.isSortableFieldsEmpty()) {
      if (this.sortableColumns.includes(field)) return field;
      else return ""
    }
    return "";
  }

  // checking if columns object has fields with sort set to -> true
  private isSortableFieldsEmpty() {
    return _.isEmpty(this.sortableColumns);
  }


  // selectAll(event, data) {
  //   console.log(event);
  //   this.selectedAllData = data;
  //   console.log("All Selected : ", this.selectedData);
  // }


  // checking if column has a condition
  checkIfColumnHasCondition(field, data) {
    let col = _.filter(this.config.columns, col => col.field == field && col.condition != "")[0];
    if (col.condition == conditions.gt) {
      return data[field] > col.conditionValue;
    }
    if (col.condition == conditions.e) {
      return data[field] == col.conditionValue;
    }

    if (col.condition == conditions.gte) {
      return data[field] >= col.conditionValue;
    }

    if (col.condition == conditions.lt) {
      return data[field] < col.conditionValue;
    }
    if (col.condition == conditions.lte) {
      return data[field] <= col.conditionValue;
    }
    if (col.condition == conditions.ne) {
      return data[field] != col.conditionValue;
    }
  }

  // Emmiting Page Change Event (Pagination)
  onPageChange(event) {
    // console.log(" End of page. ");
    this.onEvent.emit({
      name: EventConstants.PAGE_CHANGE,
      data: event,
    });
  }

  // Emmiting Event on Lazy Load;
  lazyLoadEvent($event) {
    console.log($event);
    this.onEvent.emit({
      name: EventConstants.LAZY_LOAD,
      data: this.data,
      event: $event
    });
  }

  // Emmiting Sort Event
  customSort($event) {
    console.log($event);
    this.onEvent.emit({
      name: EventConstants.SORT,
      data: this.data,
      event: $event
    });
  }

  // Emmiting Select event when a row is selected
  onRowSelect(event) {
    this.onEvent.emit({
      name: EventConstants.SELECT,
      data: this.selectedData,
      event
    });
  }

  // Emmiting UnSelect event when a row is Un-selected
  onRowUnselect(event) {
    this.onEvent.emit({
      name: EventConstants.UNSELECT,
      data: this.selectedData,
      event
    });
  }
}
