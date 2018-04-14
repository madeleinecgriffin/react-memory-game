import React, { Component } from "react";
import Pic from "./components/Pic";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import About from "./components/About";
import pics from "./pics.json";
import "./App.css";

class App extends Component {

  // Setting this.state.pics to the pics json array, the current score, the high score, and the array of clicked pics
  state = {
    pics,
    count: 0,
    highCount: 0,
    chosenPics: [],
    guess: "Click a Pic to Begin"
  };


  //shuffles the pics for display on screen
  shufflePics = (pics) => {
    for (var i = pics.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = pics[i];
      pics[i] = pics[j];
      pics[j] = temp;
    }
    return pics;
  }


  //lets the play know they have guessed all pics correctly
  winner = () => {
    if (this.state.count === 12) {
      this.setState({ guess: "Congrats, you Win!" });
    }
  }


  //function that updates the score values
  updateCount = () => {
    this.setState({ count: this.state.count + 1 });

    if (this.state.count === this.state.highCount) {
      this.setState({ highCount: this.state.highCount + 1 });
    }
  }


  //function to add a new pic to the clicked array if this is the first time it was clicked
  picChosen = (reset, element, id, thisPic) => {
    if (reset === false && element === id) {
      this.state.chosenPics.push(thisPic);
      this.setState({ guess: "Correct!" });
    }
  }

 
  //function to check if a pic has been clicked or not by seeing if it is contained in the clicked pics array
  checkPic = (hold, id, element, reset) => {

    if (hold === id && element === id) {
      this.setState({ count: 0 });
      this.setState({ highCount: this.state.highCount });
      this.setState({ guess: "Incorrect :(" });

      var holdArr = [];
      this.setState({ chosenPics: holdArr });
      reset = true;
    }
    return reset;
  }


  //function to iterate through the game
  iteratePics = id => {

    //iterates through all pics to determine which was clicked
    for (let index = 0; index < pics.length; index++) {
      var thisPic = pics[index];
      var element = pics[index].id;
      var reset = false;

      //determines if this is the inital click or not and automatically updates the score
      if (this.state.chosenPics.length === 0 && element === id) {

        //pushes inital pic clicked to the clicked pics array
        this.state.chosenPics.push(thisPic);
        this.setState({ guess: "Correct!" });
        break

      }

      //iterates through the array of clicked pics and compares the current pic
      for (let j = 0; j < this.state.chosenPics.length; j++) {

        var hold = this.state.chosenPics[j].id;
        //calls function to check if pic has been chosen and resets game if it has
        reset = this.checkPic(hold, id, element, reset);

      }

      //calls function to add pic to list of clicked pics if it has not already been clicked
      this.picChosen(reset, element, id, thisPic);

    }
    return reset;
  }


  //function that runs when the player pics a card - it iterates through the other functions
  guessCard = id => {

    //calls the function that iterates the count
    this.updateCount();

    //runs the id of the clicked pic through the iteration function
    this.iteratePics(id);

  };
  

  // Map over this.stacd srcte.pics and render a picCard component for each pic object
  render() {
    const shuffledPics = this.shufflePics(this.state.pics);
    return (
      <Wrapper>
        <Title><p>Shiba Memory Game!</p></Title>
        <Title><p>{this.state.guess}</p></Title>
        <Title><p>Score: {this.state.count} | High Score: {this.state.highCount}</p></Title>
        <About><p>Click <a href="http://time.com/4005066/maru-shiba-inu-best-dog/" rel="noopener noreferrer" target="_blank">here</a> to learn more about Marutaro.</p></About>

        {shuffledPics.map(pic => (
          <Pic
            guessCard={this.guessCard}
            id={pic.id}
            key={pic.id}
            image={pic.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
