import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WebServices {

  constructor(public http: HttpClient) { }

  hostApiEndpoint: string = "http://localhost:8080";

  public httpPost(url: string, body?: any): Observable<any> {
    return this.http.post(url, body);
  }
  public httpPostWithUrlEncodedBody(url: string, body: any): Observable<any> {
    return this.http.post(url, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  public httpPostWithFormData(url: string, formData: FormData): Observable<any> {
    return this.http.post(url, formData);
  }

  public httpGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  public httpGetWithOptions<T>(url: string, options?: any): Observable<any> {
    return this.http.get<T>(url, options ?? undefined);
  }

  public httpPostWithHeaders(url: string, body: any, headersInput: HttpHeaders): Observable<any> {
    return this.http.post<any>(url, body, { headers: headersInput });
  }
  public httpPostWithHeadersAndResponse(url: string, body: any, headersInput: HttpHeaders): Observable<any> {
    return this.http.post(url, body, { headers: headersInput, observe: 'response'});
  }

  public httpPostWithHeadersAndResponseString(url: string, body: any, headersInput: HttpHeaders): Observable<any> {
    return this.http.post(url, body, { headers: headersInput, observe: 'response' ,responseType: 'text' });
  }

  public httpPostWithHeadersAndBlob(url: string, body: any, headersInput: HttpHeaders): Observable<any> {
    return this.http.post<any>(url, body, { headers: headersInput, responseType: "blob" as any, observe: 'response' });
  }
  public httpGetWithHeadersAndBlob(url: string, headersInput: HttpHeaders): Observable<any> {
    return this.http.get<any>(url, { headers: headersInput, responseType: "blob" as any, observe: 'response' });
  }
  public httpGetWithParams(url: string, paramsInput: HttpParams): Observable<any> {
    return this.http.get(url, { params: paramsInput });
  }
  public httpGetWithParamsWithResponse(url: string, paramsInput: HttpParams): Observable<any> {
    return this.http.get(url, { params: paramsInput, observe: 'response' });
  }
  public httpGetWithHeaders(url: string, headersInput: HttpHeaders): Observable<any> {
    return this.http.get(url, { headers: headersInput });
  }
  public httpGetWithHeadersAndParams(url: string, headersInput: HttpHeaders, paramsInput: HttpParams): Observable<any> {
    return this.http.get(url, { headers: headersInput, params: paramsInput });
  }
  public httpPut(url: string, body?: any): Observable<any> {
    return this.http.put(url, body);
  }
  public httpPutWithFormData(url: string, formData: FormData): Observable<any> {
    return this.http.put(url, formData);
  }
  public httpPatch(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }
  public httpDelete(url: string): Observable<any> {
    return this.http.delete(url, {observe: 'response'});
  }
}
