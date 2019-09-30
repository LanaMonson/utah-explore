import React, { Component } from "react";
import {baseURL} from "./Home"

export default class Admin extends Component {
  state = {
    images: [],
    newImgUrl: null,
    newImgTitle: null
  };

  constructor() {
    super();
    this.loadImageList = this.loadImageList.bind(this);
    this.updateNewImgUrl = this.updateNewImgUrl.bind(this);
    this.updateNewImgTitle = this.updateNewImgTitle.bind(this);
    this.addImage = this.addImage.bind(this);
    this.editImage = this.editImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }
  //The ‘this’ keyword typically references a JavaScript element 
  //depending on the scope or context of its use.
  //In React component classes we define methods that will refer to class attributes 
  //such as props and state. However, for our methods to have access to this.state 
  //and this.props we need to bind the React component ‘this’ context to those methods.
  //Binding ‘this’ to the class methods enables us to access props 
  //and state for the component with this.props and this.state.
  //All functions in Javascript have a bind method, which allow you to specify the value for this. 
  //Once a function has been “bound” the context can’t be overriden, 
  //meaning that we have a guarantee that this will refer to the correct thing.
  
  //.bind(this)
  //react does autobindings for you automatically 

  loadImageList() {
    return fetch(`${baseURL}`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({ images: data });
      });
  }

  componentDidMount() {
    this.loadImageList();
  }

  updateNewImgUrl(e) {
    this.setState({ newImgUrl: e.target.value });
  }

  updateNewImgTitle(e) {
    this.setState({ newImgTitle: e.target.value });
  }

//CRUD
  addImage(e) {
    return fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        img: this.state.newImgUrl,
        title: this.state.newImgTitle
      })
    }).then(() => {
      alert("Added image " + this.state.newImgTitle);
      this.loadImageList();
    });
  }

  editImage(e) {
    const txt = document.getElementById("title" + e.target.id);
    const imgId = e.target.id;
    return fetch(`${baseURL}` + imgId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: txt.value
      })
    }).then(() => {
      alert("Updated image " + imgId);
      this.loadImageList();
    })
    .then(document.location.reload(true));
  }

  deleteImage(e) {
    const imgId = e.target.id;
    return fetch(`${baseURL}` + imgId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      alert("Deleted image " + imgId);
      this.loadImageList();
    });
  }

  //using short-hand syntax to set the images value in this.state
  //an array method called map()
  //Now that our state has an ARRAY of data to work with, 
  //we can LOOP over it using map() by modifying our render() method like this:
  render() {
    const myImages = this.state.images.map(image => {
      return (
        <div key={image._id}
          className="list-group-item">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <span>{image.title}</span>
                <input
                  id={"title" + image._id}
                  className="row"
                  title="Type in new title"
                />
                <img className="img-edit row" src={image.img} alt={image.title} />
              </div>
              <div className="col-sm">
                <button
                  id={image._id}
                  type="button"
                  className="btn btn-dark"
                  onClick={this.editImage}
                >
                  Change Title
                </button>
                <button
                  id={image._id}
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deleteImage}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="list-group">
          <div className="list-group-item">
            <div className="row">
              <div className="col-sm">
                <span className="row">New Image URL</span>
                <input type="text" onChange={this.updateNewImgUrl} />
              </div>
              <div className="col-sm">
                <span className="row">New Image Title</span>
                <input type="text" onChange={this.updateNewImgTitle} />
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.addImage}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {myImages}
        </div>
      </div>
    );
  }
}
