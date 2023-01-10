import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {LocationDto} from "../model/locationDto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {
  private baseUrl = `${environment.eventsBaseUrl}/locations`;

  constructor(private http: HttpClient) {
  }

  public getLocations(): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(this.baseUrl);
  }

  public getLocation(id: string): Observable<LocationDto> {
    return this.http.get<LocationDto>(`${this.baseUrl}/${id}`);
  }

  public postLocation(location: LocationDto): Observable<LocationDto> {
    return this.http.post<LocationDto>(this.baseUrl, location);
  }

}
