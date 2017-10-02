

import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';



import { AbstractEntity } from './abstract.entity';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GlobalService {
    public numberOfPendingRequest: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private http: Http) {
    }

    logout() {
       // localStorage.removeItem('access_token');
        //localStorage.removeItem('refresh_token');
        //TODO remove  the   token from server  too.
       // location.href = ("/login");
    }

    getNoOfPendingRequest(): Observable<number> {
        return this.numberOfPendingRequest.asObservable();
    }

    private incrementNumberOfPendingRequest() {
        this.numberOfPendingRequest.next(this.numberOfPendingRequest.getValue() + 1)
    }

    private decrementNumberOfPendingRequest() {
        this.numberOfPendingRequest.next(this.numberOfPendingRequest.getValue() - 1)
    }


    public config() {
        var authHeader = new Headers();;
        authHeader.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

        return authHeader;
    };
    getData<ENTITY>(isSecured: boolean,  path: string, options?: any): Observable<ENTITY> {
        this.incrementNumberOfPendingRequest();
        if (options == null) {
            options = {};
        }
        if (isSecured) {
            options.headers = this.config();
        }
        return this.http.get(path, options)
            .map(response => {
                this.decrementNumberOfPendingRequest();
                return this.extractData(response)
            })
            .catch((err: Response, caught: Observable<ENTITY>) => {
                this.decrementNumberOfPendingRequest();
                Observable.of({ err }).subscribe((value) => { console.log(value); });
                console.log(err.json());
                if (err.status === 0) {
                    this.logout();
                }
                console.log('error message');
                console.log(err);
                if (err.status === 401) {
                    alert('i am 401');


                    //  this._router.navigate(["/auth/login"]);
                    //return Observable.throw("401 Unauthorized");
                }
                return Observable.throw(caught); // <-----
            }); //...errors if any
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    postData<ENTITY>(isSecured: boolean, path: string, body: any): Observable<ENTITY> {
        this.incrementNumberOfPendingRequest();
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers();
        if (isSecured) {
            headers = this.config();

        }
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(path, body, options) // ...using post request
            .map(response => {
                this.decrementNumberOfPendingRequest();
                return this.extractData(response)
            }) // ...and calling .json() on the response to return data
            .catch((err: Response, caught: Observable<ENTITY>) => {
                this.decrementNumberOfPendingRequest();
                Observable.of({ err }).subscribe((value) => { console.log(value); });
                console.log(err.json());
                if (err.status === 0) {
                    this.logout();
                }
                console.log('error message');
                console.log(err);
                if (err.status === 401) {
                    alert('i am 401');


                    //  this._router.navigate(["/auth/login"]);
                    //return Observable.throw("401 Unauthorized");
                }
                if (err.status === 400) {

                }
                return Observable.throw(caught); // <-----
            }); //...errors if any
    }

    putData<ENTITY>(isSecured: boolean, path: string, body: any): Observable<ENTITY> {
        this.incrementNumberOfPendingRequest();
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers();
        if (isSecured) {
            headers = this.config();

        }
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(path, body, options) // ...using post request
            .map(response => {
                this.decrementNumberOfPendingRequest();
                return this.extractData(response)
            }) // ...and calling .json() on the response to return data
            .catch((err: Response, caught: Observable<ENTITY>) => {
                this.decrementNumberOfPendingRequest();
                if (err.status === 401) {
                    alert('i am 401');
                    //  this._router.navigate(["/auth/login"]);
                    return Observable.throw("401 Unauthorized");
                }
                return Observable.throw(caught); // <-----
            }); //...errors if any
    }

    deleteData<ENTITY>(isSecured: boolean, path: string, id: string): Observable<ENTITY> {
        this.incrementNumberOfPendingRequest();
        let headers = new Headers();
        if (isSecured) {
            headers = this.config();

        }
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.delete(`${path}/${id}`, options) // ...using put request
            .map(response => {
                this.decrementNumberOfPendingRequest();
                return this.extractData(response)
            }) // ...and calling .json() on the response to return data
            .catch((err: Response, caught: Observable<ENTITY>) => {
                this.decrementNumberOfPendingRequest();
                if (err.status === 401) {
                    alert('i am 401');
                    //  this._router.navigate(["/auth/login"]);
                    return Observable.throw("401 Unauthorized");
                }
                return Observable.throw(caught); // <-----
            }); //...errors if any
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}