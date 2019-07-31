import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Context from '../Context';
   
export default class CreateCourse extends Component {

    constructor() {
        super();
        this.state = {
          courseTitle:"",
          courseDescription:"",
          materials:"",
          time: "",
          errorTitle: '',
          errors: [],

        };
      }
      render(){
        const {
          courseTitle,
          courseDescription,
          materials,
          time,
          errorTitle,
          errors
        } = this.state;
        const {context} = this.props;
        
        const authUser = this.context.authenticatedUser;
        
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
                id="courseTitle" 
                name="courseTitle" 
                type="text" 
                className="input-title course--title--input" 
                placeholder="Course title..."
                value={this.state.courseTitle}
                onChange={this.change}/>
                </label>
            <p>By 
            {/* {authUser.firstName} {authUser.lastName} */}
            </p>
          </div>
          <div className="course--description">
            <label><textarea 
            id="courseDescription" 
            name="courseDescription" 
            className="" 
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
                    value={this.state.time}
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
  if (!this.state.courseTitle || !this.state.courseDescription) {
    e.preventDefault();
    this.setState({
      errorTitle: 'Validation Errors:',
      errors: 'Wait! Both a Course Title and Description are required.'
    })
  } else
   {
    e.preventDefault();

    const {courseTitle, courseDescription, time, materials} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password
  console.log(authUser.firstName)
  console.log(authUser.lastName)
  console.log(emailAddress)
  console.log(password)

    const course = {
      courseTitle,
      courseDescription,
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

