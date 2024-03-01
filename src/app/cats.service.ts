import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private url = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  getCats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/images/search?limit=10`);
  }

  getCatById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/images/${id}`);
  }

  getCatsDetails(): Observable<any[]> {
    return this.getCats().pipe(
      switchMap((cats) => {
        if (!cats || cats.length === 0) {
          return of([]);
        } else {
          return forkJoin(
            cats.map((cat) =>
              this.getCatById(cat.id).pipe(
                map((getCatById) => ({
                  ...cat,
                  width: getCatById.width || 'Unknown',
                  height: getCatById.height || 'Unknown',
                  breeds: getCatById.breeds || [],
                })),
                catchError(() =>
                  of({
                    ...cat,
                    width: 'Unknown',
                    height: 'Unknown',
                    breeds: [],
                  })
                )
              )
            )
          );
        }
      })
    );
  }
}
export interface Cat {
  id: number;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

export interface Breed {
  name: string;
}
