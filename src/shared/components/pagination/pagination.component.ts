import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PagerService } from 'src/services/helpers/pager.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
    page = 1;
    pager: any = {};
    @Input() totalPage;
    @Input() pageSize = 20;
    @Input() items: {}[];
    @Input() resetPage;
    @Input() showPage = true;
    isCheckAll = false;
    listActiveFilter = [];

    @Output() outputPageSelect = new EventEmitter();
    pagedItems: {}[];

    constructor(private pagerService: PagerService) {}

    ngOnInit(): void {}

    ngOnChanges(change) {
        if (this.resetPage) {
            this.setPage(1);
        }

        if (!this.showPage) {
            this.pageSize = 1000;
        }
        this.isCheckAll = false;
        this.setPage(this.page);
    }

    choosePage(page: number) {
        this.setPage(page, this.pager);
    }

    setPage(page, isClickPage?) {
        // eslint-disable-next-line prefer-const
        this.page = page;
        const self = this;
        if (!this.items || page < 1 || (this.pager && this.pager.totalPages !== 0 && page > this.pager.totalPages)) {
            return;
        }
        // get pager object from service
        // eslint-disable-next-line prefer-const
        let totalPage = this.totalPage || this.items.length;
        page = totalPage / this.pageSize < page ? Math.ceil(totalPage / this.pageSize) : page;
        this.pager = this.pagerService.getPager(totalPage, page, this.pageSize);
        if (this.totalPage) {
            if (isClickPage) {
                this.outputPageSelect.emit({ page, number: this.pager });
            }
            this.pagedItems = this.items;
            return;
        }

        // get current page of items
        this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
