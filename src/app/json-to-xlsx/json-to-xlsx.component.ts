import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import jsonrepair from 'jsonrepair';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver'
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-json-to-xlsx',
  templateUrl: './json-to-xlsx.component.html',
  styleUrls: ['./json-to-xlsx.component.css'],
})
export class JsonToXlsxComponent implements OnDestroy, OnInit {
  @ViewChild('data') inputName: any;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private title: Title, private meta: Meta) {}

  textareaData: any;
  render = false;
  toDownload: any;
  tableTitles: any[] = [];
  tableRows: any[] = [];
  showData = false;
  showError = false;
  errorMessage = 'A valid json object is required'

  ngOnInit(): void {
    this.title.setTitle('Idetek | json to excel');
    this.meta.updateTag({ name: 'description', content: 'Convert json data to excel and csv file' });
    this.dtOptions = {
      pagingType: 'full_numbers',
      retrieve: true,
      pageLength: 10
    }; 
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if("dtInstance" in this.dtElement){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next('');
      });
    }
    else{
      this.dtTrigger.next('');
    }
  }

  textareaChange(e: any): boolean {
    if (e.length > 0) {
      const aux = e.split('');
      let first = aux[0];
      let last = aux[aux.length - 1];
      if (first !== '[' && first !== '{' && last !== ']' && last !== '}') {
        this.showError = true;
        this.empty();
        return false;
      }
      try {
        e = jsonrepair(e);
        this.showError = false;
      } catch (error) {
        this.showError = true;
        this.empty();
        return false;
      }
      let json = JSON.parse(e);
      this.toDownload = json;
      if (json.length > 0) {
        this.empty();
        if (this.isNested(json[0])) {
          json[0] = this.flatten(json[0])
        }
        this.tableTitles = Object.keys(json[0]);
        let b = false
        json.forEach((element: any) => {
          if (this.isNested(element)) {
            element = this.flatten(element)
          }
          if (
            String(Object.keys(element)) !== String(this.tableTitles) && 
            Object.keys(element).length > 0 &&
            Array.isArray(json)
          ) {
            b = true
          }
          this.tableRows.push(Object.values(element));
          this.dtTrigger.next('')
        });
        if (b) {
          this.showError = true
          this.errorMessage = 'All objects must have the same keys'
          this.empty()
          return false
        }
      } else {
        this.empty();
        if (this.isNested(json)) {
          json = this.flatten(json)
        }
        this.tableTitles = Object.keys(json);
        this.tableRows.push(Object.values(json));
        this.toDownload = [json]
      }
      this.showData = true;
    } else {
      this.showError = false;
      this.empty();
    }
    if (this.render) {
      this.rerender()
    }
    return true;
  }

  s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
  }

  downloadXLS(): void {
    const ws_name = 'data';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.toDownload);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), 'data.xlsx');
  }

  downloadCSV(): void {
    const ws_name = 'data';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.toDownload);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'csv', bookSST: true, type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), 'data.csv');
  }

  reset(): void {
    this.inputName.nativeElement.value = '';
    this.showError = false;
    this.empty();
  }

  flatten(data: any): any {
    var result: any = {};
    function recurse(cur: any, prop: any) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + '[' + i + ']');
        if (l == 0) result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + '.' + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(data, '');
    return result;
  }
  
  isNested(data: any) {
    return Object.keys(data).some(function(key) {
      return data[key] && typeof data[key] === 'object';
    });
  }

  empty(): void {
    this.render = true
    this.tableTitles = [];
    this.tableRows = [];
    this.showData = false;
  }
}
