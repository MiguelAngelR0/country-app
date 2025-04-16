import { Component, inject, resource, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';



@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countyService = inject(CountryService)
  query = signal('')

  //solucion Con rxResource
  //este resource trabaja con Observables
  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]); //Funcion que nos permite regresar un Observable

      return this.countyService.searchByCapital(request.query)
    }
  })

  //Nueva Solucion Resource
  //este resource trabaja con promesas, no con Observables
  // countryResource = resource({
  //   request:() => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     // if(this.query()) return [];

  //     if(!request.query) return [];

  //     return await firstValueFrom( //convierte cualquier observable en una promesa
  //       this.countyService.searchByCapital(request.query)
  //     );
  //   }
  // })




  //Solucion para angular 19 para abajo

  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])
  // onSearch(query:string){
    // if(this.isLoading()) return;
    // this.isLoading.set(true);
    // this.isError.set(null)
    // this.countyService.searchByCapital(query)
    // .subscribe( {
    //   next:(countries) => {
    //     this.isLoading.set(false);
    //     this.countries.set(countries)
    //   },
    //   error:(err) => {
    //     this.isLoading.set(false);
    //     this.countries.set([])
    //     this.isError.set(err);
    //   }
    // })
  // }



 }
