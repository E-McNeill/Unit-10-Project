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
          materialsNeeded:"",
          estimatedTime: "",
          errorTitle: '',
          errors: [],

        };
      // }
      render(){
        const {
          title,
          description,
          materialsNeeded,
          estimatedTime,
          errorTitle,
          errors
        } = this.state;
        const {context} = this.props;
        
        const authUser = context.authenticatedUser;
        // console.log(authUser)
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
      <form onSubmit={this.submit} >
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
                <h4>Estimated estimatedTime</h4>
                <label>
                    <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="text" 
                    className="course--time--input"
                    placeholder="Hours" 
                    value={estimatedTime}
                    onChange={this.change}
                    /></label>
              </li>
              <li className="course--stats--list--item">
                <h4>materials Needed</h4>
                <label>
                  <textarea 
                  id="materialsNeeded" 
                  name="materialsNeeded" 
                  className="" 
                  placeholder="List Materials Needed..."
                  value={materialsNeeded}
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

submit = (e) => 
{
  // console.log(this.state.title.length)
  // if (this.state.title.length < 1 || this.state.description.length < 1) {
  //   e.preventDefault()

    // this.setState({

    // })
  // } 
  // else
  //  {
    e.preventDefault();

    const {title, description, estimatedTime, materialsNeeded} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId : authUser.id
    }
//creates a new course
    context.data.createCourse(course, emailAddress, password)  
    .then(err => {
      // console.log(err)

      const errMSG = Object.values(err);
      if (errMSG.length > 0) {
        this.setState({ 
          errors: errMSG,
          errorTitle: 'Validation Errors:',
          

        }); 
        // console.log(err)
      }  else {
        this.props.history.push(`/`);
        // console.log(errMSG)
      }
    })
    .catch((err) => {
      // console.log(err)
    }) 
}

}




// }

