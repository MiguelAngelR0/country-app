import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';



export class CountryMapper{

  static mapRestCountrytoCountry(restCountry: RESTCountry): Country{
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common ?? 'No Eng Name',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries:RESTCountry[]): Country[] {

    return restCountries.map(this.mapRestCountrytoCountry)
    // return restCountries.map( (country) => this.mapRestCountrytoCountry(country))
  }

}


