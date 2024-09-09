import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private backendUrl = environment.baseURL;
	private browserInfo: { name: string, version: string };
	private browserName: string = 'Unknown';
	private browserVersion: string = 'Unknown';

	constructor(private http: HttpClient) {
		this.browserInfo = this.getBrowserInfo();
	}

	/**
	 * Do not change the order of the if statements in the below function
	 */
	getBrowserInfo() {
		const userAgent = navigator.userAgent;
		if (/opr\//i.test(userAgent)) {
			this.browserName = 'Opera';
			this.browserVersion = userAgent.match(/OPR\/([0-9.]+)/)?.[1] || '';
		} else if (/edg/i.test(userAgent)) {
			this.browserName = 'Edge';
			this.browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
		} else if (/chrome|crios|crmo/i.test(userAgent) && !/edg/i.test(userAgent)) {
			this.browserName = 'Chrome';
			this.browserVersion = userAgent.match(/Chrom(e|ium)\/([0-9.]+)/)?.[2] || '';
		} else if (/safari/i.test(userAgent) && !/chrome|crios|crmo|opr\//i.test(userAgent)) {
			this.browserName = 'Safari';
			this.browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || '';
		} else if (/firefox|fxios/i.test(userAgent)) {
			this.browserName = 'Firefox';
			this.browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || '';
		} else if (/trident/i.test(userAgent)) {
			this.browserName = 'Internet Explorer';
			this.browserVersion = userAgent.match(/rv:([0-9.]+)/)?.[1] || '';
		}
		return { name: this.browserName, version: this.browserVersion };
	}

	createRecord(): Observable<any> {
		return this.http.post(`${this.backendUrl}/create`, { browserInfo: this.browserInfo });
	}

	getRecords(): Observable<any> {
		return this.http.get(`${this.backendUrl}/records`, { params: { browserInfo: JSON.stringify(this.browserInfo) } });
	}

	getSum(): Observable<any> {
		return this.http.get(`${this.backendUrl}/sum`, { params: { browserInfo: JSON.stringify(this.browserInfo) } });
	}
}
