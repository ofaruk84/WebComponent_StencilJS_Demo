import { Component, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'pd-country-language',
  styleUrl: './country-language.css',
  shadow: true,
})
export class CountryLanguage {
  @State() inputValue: string = '';

  @Event() pdlangselected: EventEmitter<any>;

  handleInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  async handleSearch() {
    if (!this.inputValue.trim()) return;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/lang/${this.inputValue}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      this.pdlangselected.emit(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  render() {
    return (
      <div class="form-container">
        <input
          type="text"
          class="input"
          placeholder="Enter language name (e.g., 'english,french')"
          value={this.inputValue}
          onInput={(event) => this.handleInput(event)}
        />
        <button class="button" onClick={() => this.handleSearch()}>Search</button>
      </div>
    );
  }
}
