import React, { Fragment, Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Destinations from '../../components/Destinations/';
import Results from '../../components/Results/';
import cities from 'cities.json';
import CityNames from '../../helpers/country-names';
import hols from '../../gb-holidays.json';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.specialDays = ['Christmas', 'Boxing day', 'New years day'];
    this.countries = cities
      .map(i => i.country)
      .filter((item, i, ar) => ar.indexOf(item) === i)
      .map(i => ({ code: i, name: CityNames[i] }))

    this.state = {
      email: '',
      country: '',
      activeSuggestion: 0, // The active selection's index
      filteredSuggestions: [], // The suggestions that match the user's input
      showSuggestions: false, // Whether or not the suggestion list is shown
      christmas: false,
      boxingday: false,
      newyearsday: false,
      destination: '',
      duration: '',
      destinations: [],
      results: [],
    };
    
    this.checkboxChange = this.checkboxChange.bind(this);
    this.destinationChange = this.destinationChange.bind(this);
    this.onDesinationClick = this.onDesinationClick.bind(this);
    this.onDestinationKeyDown = this.onDestinationKeyDown.bind(this);
    this.simpleChange = this.simpleChange.bind(this);
    this.addDestination = this.addDestination.bind(this);
    this.submit = this.submit.bind(this);
  }

  checkboxChange(e, type) {
    this.setState({ [type]: e.currentTarget.value});
  }

  destinationChange(e) {
    const suggestions = cities.map(i => `${i.name}, ${i.country}`);
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      destination: e.currentTarget.value
    });
  }

  onDesinationClick(e) {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      destination: e.currentTarget.innerText
    });
  };

  onDestinationKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        destination: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  simpleChange(e, key) {
    this.setState({ [key]: e.currentTarget.value});
  }

  addDestination(e) {
    const {
      destination,
      duration,
      destinations,
    } = this.state;

    if (!destination || !duration) {
      this.setState({
        error: 'Please add both a duration and destination',
      });
    }

    destinations.push({
      destination,
      duration,
    });

    this.setState({
      error: '',
      destination: '',
      duration: '',
      destinations,
    });
  }

  removeDestination(e, i) {
    e.preventDefault();
    
    const { destinations } = this.state;

    this.setState({
      destinations: destinations.splice(i, 1),
    });
  }

  submit(e) {
    e.preventDefault();

    const { destinations } = this.state;

    if (destinations.length === 0) {
      return this.setState({
        error: 'You need to add some destinations',
      });
    }

    const daysOff = [];

    // make a list of weekends
    // merge with bank holidays (add the )
    // create a

    // if there is less destinations than holidays, asign them chronologically
    // loop the destinations
    // loop the holidays

    const holidays = hols.response.holidays.filter(i => i.type === 'public');
    const start = moment(); // now
    const end = moment('2016-11-02'); // Nov. 2nd
    const day = 0; // Sunday
    const current = start.clone();
    
    while (current.day(7 + day).isBefore(end)) {
      const results = this.state.results;
      results.push(current.clone());
      
      this.setState({
        error: '',
        results: results,
      });
    }
    
    console.log(this.state.results.map(m => m.format('LLLL')));
  }

  render() {
    const {
      error,
      email,
      country,
      showSuggestions,
      filteredSuggestions,
      activeSuggestion,
      destination,
      duration,
      destinations,
      results,
    } = this.state;

    let suggestionsListComponent;

    if (showSuggestions && destination && destination.length > 2) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  className={classnames({ 'suggestion-active': index === activeSuggestion })}
                  onClick={(e) => this.onDestinationKeyDown(e)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Trippr</h1>

        <p>Input the destinations you want and the number of days you would like to visit for, and we'll plan out your year and then find some flights and hotels.</p>

        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => this.simpleChange(e, 'email')}
          />
        </div>

        <div>
          <select onChange={(e) => this.simpleChange(e, 'country')}>
            <option value="">Select country...</option>
            { 
              this.countries.map(country => 
                <option value={country.code} key={country.code}>
                  {country.name}
                </option>
              )
            }
          </select>
        </div>

        <div className="form">
          <div className="error">{error}</div>

          <div>
            <Fragment>
              <input
                type="text"
                id="destination"
                placeholder="Destination"
                value={destination}
                onChange={(e) => this.destinationChange(e)}
                onKeyDown={(e) => this.onDestinationKeyDown(e)}
                autoComplete="off"
              />
              {suggestionsListComponent}
            </Fragment>
          </div>

          <div>
            <input
              type="number"
              id="duration"
              value={duration}
              placeholder="Duration (days)"
              onChange={(e) => this.simpleChange(e, 'duration')}
              min="1"
            />
          </div>
          
          <div>
            <button type="button" onClick={(e) => this.addDestination()}>Add</button>
          </div>

          <div>
            {
              this.specialDays.map(i => {
                const ignoreDays = i.replace(/ /g, '').toLocaleLowerCase();

                return (
                  <label key={ignoreDays}>
                    <input
                      type="checkbox"
                      onChange={(e) => this.checkboxChange(e, ignoreDays)}
                      value={true}
                    /> {i}
                  </label>
                );
              })
            }
          </div>
          
          <div>
            <button onClick={(e) => this.submit(e)}>Submit</button>
          </div>
        </div>
        
        {
          destinations &&
          destinations.length > 0 && (
            <Destinations
              removeDestination={(e) => this.removeDestination(e)}
              destinations={destinations} 
            />
          )
        }
        
        {
          results && 
          results.length > 0 && 
            <Results results={results} />
        }

      </div>
    );
  }
}

export default App;
