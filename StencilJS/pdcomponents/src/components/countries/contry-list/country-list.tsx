import { Component, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'pd-country-list',
  styleUrl: './country-list.css',
  shadow: true,
})
export class CountryList {
  @State() countries: { name: string; code: string }[] = []


  @Listen('pdlangselected', { target: 'body' })
  onLanguageSelected(event: CustomEvent) {

    console.log(event.detail);
    const countryList: any[] = event.detail;
    const stateList = [];
  
    if (countryList.length) {
      countryList.forEach((item) => {
        stateList.push({ name: item.name.common, code: item.cca2 });
      });
    }
  
    // Assign the processed list to `this.countries`
    this.countries = stateList;
    console.log(this.countries);
  }

  render() {
    return (
      <div class="content">
        <ul class="countries">
          {this.countries.map(country => (
            <li class="list-item">{country.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
