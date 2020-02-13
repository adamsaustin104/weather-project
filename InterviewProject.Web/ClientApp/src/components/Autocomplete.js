import React, { Component, Fragment } from "react";
import PropTypes                      from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      //Suggestions from query by location
      queriedSuggestions: [],
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
    };

    this.handleSearchByLocation = this.handleSearchByLocation.bind(this) 
   }

  handleSearchByLocation(search) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const locationUrl =  proxyurl + `https://www.metaweather.com/api/location/search/?query=${search}`;
      
    fetch(locationUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        filteredSuggestions: data,
        queriedSuggestions: data,
      })
    })
    .catch((error) => console.log(error));
  }

  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value

    if(userInput !== ''){
      this.handleSearchByLocation(userInput)
    }

    while(this.state.queriedSuggestions === []){
      //wait for the query to complete the suggested list
    }

    const list = this.state.queriedSuggestions

    // Update the user input, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      queriedSuggestions: list,
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    var selectedId = 0
    this.state.queriedSuggestions.forEach(cityObject => {
      if(cityObject.title.toUpperCase() === e.currentTarget.innerText.toUpperCase()){
        selectedId = cityObject.woeid
        this.props.handleNewLocation(selectedId)
      }
    });

    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    })
  }

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        filteredSuggestions.sort(function(a, b) {
          var textA = a.title.toUpperCase();
          var textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })

        suggestionsListComponent = (
          <ul className="suggestions">
            { filteredSuggestions.slice(0, 10).map((suggestion, index) => {
              let className;
              
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active"
              }

              return (
                <li
                  className={className}
                  key={suggestion.woeid}
                  onClick={onClick}
                >
                {suggestion.title}
                </li>
              )
            })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Searching...</em>
          </div>
        )
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    )
  }
}

export default Autocomplete;