import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface Records {
	quantity: number,
	name: string,
	version: number,
};

@Component({
	selector: 'app-retrieve',
	templateUrl: './retrieve.component.html',
	styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit {
	ds = new MatTableDataSource<Records>();
	recordCount: any;
	displayedColumns: string[] = ['quantity', 'name', 'version'];
	constructor(private apiService: ApiService, private router: Router) { }
	ngOnInit(): void {
		this.apiService.getRecords().subscribe(
			(res) => {
				this.recordCount = res.data.records.length;
				this.ds = res.data.records;
			},
			(error) => {
				alert('Error fetching records!');
			}
		);
	}

	goBack() {
		if (window.opener) {
			window.close();
		} else {
			this.router.navigate(['/']);
		}
	}
}
