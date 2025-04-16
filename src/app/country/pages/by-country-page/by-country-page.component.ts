import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countyService = inject(CountryService)
  query = signal('')

  //Nueva Solucion Resource

  countryResource = rxResource({
    request:() => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);

      return this.countyService.searchByCountry(request.query)
    }
  })
}
