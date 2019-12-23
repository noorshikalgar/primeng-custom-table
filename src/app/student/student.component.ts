import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../customtable/customtable.interface';
import { StudentService } from './student.service';
import _ from 'lodash';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  data: any;
  pageNumber: number = 1;
  startIndex;
  endIndex;
  totalRecord: number;

  config: TableConfig = {
    tableHeader: "Students Data",
    columns: [
      { field: "id", header: "ID", sort: true, filter: true },
      { field: "first_name", header: "First Name", sort: true, filter: true },
      { field: "last_name", header: "Last Name", sort: true, filter: true },
      { field: "gender", header: "Gender", sort: true, filter: true },
      { field: "unversity", header: "University", sort: false, filter: true },
    ],
    pagination: true,
    globalSearch: true,
    recordsPerPage: 10,
  };


  constructor(private service: StudentService) { }

  ngOnInit() {
    this.service.getStudents(0, this.config.recordsPerPage).subscribe(res => {
      console.log(this.totalRecord);
      this.totalRecord = Number(res.headers.get("X-Total-Count"));
      this.data = res.body;
    });
  }

  sortData(data, order, field) {
    // this.service.getStudents(this.startIndex, this.endIndex, { field, order }).subscribe(res => {
    //   console.log(" Server - Sorted Data : ", res.body);
    //   // this.data = res.body;
    // });
    console.log(" order : ", order);
    console.log(" data : ", data);
    console.log(" field : ", field);
    this.data = _.orderBy(data, field, order);
    this.totalRecord = this.totalRecord;
  }

  handleEvent(event) {
    if (event.name == "PAGE_CHANGE") {
      this.startIndex = event.data.first;
      this.endIndex = Number(event.data.rows) + Number(event.data.first);
      this.service.getStudents(this.startIndex, this.endIndex).subscribe(res => {
        // this.totalRecord = Number(res.headers.get("X-Total-Count"));
        // console.log(this.totalRecord);
        this.data = res.body;
      });
    }
    if (event.name == "Select") {
      console.log("Selected Date : ", event.data);
    }
    if (event.name == "Unselect") {
      console.log("Unselected Data : ", event.data);
    }
    if (event.name == "SORT") {
      this.sortData(event.data, event.event.order == 1 ? "asc" : "desc", event.event.field);
    }
    if (event.name == "LAZY_LOAD") {
      this.sortData(event.data, event.event.sortOrder == 1 ? "asc" : "desc", event.event.sortField);
    }
  }

  paginateData(data, startIndex, endIndex) {
    return _.slice(data, startIndex, endIndex);
  }

  getStudents() {

  }

}
