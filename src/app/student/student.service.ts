import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(start, end) {
    let query = `?_start=${start}&_end=${end}`;
    return this.http.get("http://localhost:3000/students" + query, { observe: "response" });
  }
}
