import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sum',
	templateUrl: './sum.component.html',
	styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {

	totalSum: number = 0;

	constructor(private apiService: ApiService, private router: Router) { }

	ngOnInit(): void {
		this.apiService.getSum().subscribe((res) => {
			this.totalSum = res.data.totalSum;
		}, (error) => {
			alert('Error fetching sum.');
		});
	}

	goBack() {
		if (window.opener) {
			window.close();
		} else {
			this.router.navigate(['/']);
		}
	}
}
