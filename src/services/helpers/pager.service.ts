import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PagerService {
    constructor() { }
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
      // calculate total pages
      const totalPages = Math.ceil(totalItems / pageSize);

      let startPage: number; let endPage: number;
      if (totalPages <= 5) {
        // less than 5 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 5 total pages so calculate start and end pages
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
          startPage = totalPages - 4;
          endPage = totalPages;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }

      // calculate start and end item indexes
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      const pages = _.range(startPage, endPage + 1);

      // return object with all pager properties required by the view
      return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
      };
    }
  }
