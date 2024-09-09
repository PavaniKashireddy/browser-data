import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	message: string | null = null;
	constructor(private apiService: ApiService, private router: Router) { }

	createRecord() {
		this.apiService.createRecord().subscribe({
			next: (response) => {
				alert(response.data.message);
			},
			error: (error) => {
				if (error.error && error.error.message) {
					alert(error.error.message);
				} else if (error.message) {
					alert(error.message);
				} else {
					alert('An unknown error occurred');
				}
			}
		});
	}

	navigateTo(route: string) {
		window.open(`/${route}`, '_blank');
	}

	ngOnInit(): void {
	}
}
