import React, { Component } from "react";

export const baseURL = "https://mighty-gorge-69620.herokuapp.com/"
export default class Home extends Component {
  state = {
    images: []
  };

  //componentDidMount() method 
  //-after all the elements of the page is rendered correctly, 
  //this method is called. After the markup is set on the page, 
  //this technique called by React itself to either fetch the data 
  //from An External API or perform some unique operations which need the JSX elements.
  componentDidMount() {
    return fetch(`${baseURL}`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data) {
          data[0].active = true;
        }
        this.setState({ images: data });
      });
  }
  //.then --> method returns a Promise which allows for method chaining. 
  //(Backend calls building a chain). If the function passed as handler to then returns a Promise , 
  //an equivalent Promise will be exposed to the subsequent then in the method chain. 
  //A then call will return a rejected promise if the function throws an error or returns a rejected Promise

  //setState()
  //never mutate state directly. 
  //Always use setState() to change state.

  render() {
    const myImages = this.state.images.map(image => {
      return (
        <div key={image._id} className={"carousel-item" + (image.active ? "active" : "")}>
          <img className="d-block w-100" src={image.img} alt={image.title} />
        </div>
      );
    });

    console.log(this.state); //// this will print the new state (always executes once the job is done)
    return (
      <div id="carouselUtah" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">{myImages}</div>

        <a
          className="carousel-control-prev"
          href="#carouselUtah"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselUtah"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
