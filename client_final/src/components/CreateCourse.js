import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Context from '../Context';
   
export default class CreateCourse extends Component {

    // constructor() {
    //     super();
    //     this.
        state = {
          title:"",
          description:"",
          materials:"",
          time: "",
          errorTitle: '',
          errors: [],

        };
      // }
      render(){
        const {
          title,
          description,
          materials,
          time,
          errorTitle,
          errors
        } = this.state;
        const {context} = this.props;
        
        const authUser = context.authenticatedUser;
        console.log(authUser)
        return(

    <div className="bounds course--detail">
    <h1>Create Course</h1>
    <div>
      <div>
        <h2 className="validation--errors--label">{errorTitle}</h2>
        <div className="validation-errors">
          <ul>
            <li>{errors}</li>
          </ul>
        </div>
      </div>
      <form onSubmit={this.submit}>
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <label>
                <input 
                id="title" 
                name="title" 
                type="text" 
                className="input-title course--title--input" 
                placeholder="Course title..."
                value={title}
                onChange={this.change}/>
                </label>
            <p>By {authUser.firstName} {authUser.lastName}</p>
          </div>
          <div className="course--description">
            <label><textarea 
            id="description" 
            name="description" 
            className="" 
            value={description}
            placeholder="Course description..."
            onChange={this.change}>
              
              </textarea>
              </label>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <label>
                    <input 
                    id="time" 
                    name="time" 
                    type="text" 
                    className="course--time--input"
                    placeholder="Hours" 
                    value={time}
                    onChange={this.change}
                    /></label>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <label>
                  <textarea 
                  id="materials" 
                  name="materials" 
                  className="" 
                  placeholder="List materials..."
                  value={materials}
                  onChange={this.change}>
                    </textarea>
                    </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Create Course</button>
            <Link to={`/courses`}>
            <button className="button button-secondary" >Cancel</button>
            </Link>
            </div>
        </form>
        </div>
      </div>
        )
}

change = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}

submit = (e) => {
  // const {match: { params }} = this.props;
  if (!this.state.title || !this.state.description) {
    e.preventDefault();
    this.setState({
      errorTitle: 'Validation Errors:',
      errors: 'Wait! Both a Course Title and Description are required.'
    })
  } else
   {
    e.preventDefault();

    const {title, description, time, materials} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password
  console.log(authUser.firstName + authUser.lastName + emailAddress + password)

    const course = {
      title,
      description,
      time,
      materials,
      userId : authUser.id
    }

    context.data.createCourse(course, emailAddress, password)  
    .then(errors => {
      if (errors.length) {
        this.setState({ errors }); 
      }  else {
        this.props.history.push(`/`);
      }
    })
    .catch((err) => {
      console.log(err)
    }) 
}

}




}

