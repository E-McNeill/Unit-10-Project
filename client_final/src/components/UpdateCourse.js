import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateCourse extends Component {

    constructor(props) {
        super();
        this.state = {
          specificCourse: [],
          courseId: '',
          userId: '',
          userName: "",
          title:"",
          description:"",
          materials:"",
          time: "",
          errors: [],
          loading: false
        };
      }
  
      componentDidMount(){
        axios.get('http://localhost:5000/api/courses/'+ this.props.match.params.id)
        .then(response => {
            // const courseInfo = response.data;
          this.setState({
              specificCourse: response.data,
              userName: response.data.course.User.firstName + " " + response.data.course.User.lastName, 
              title: response.data.course.title,
              description: response.data.course.description,
              materials: response.data.course.materialsNeeded,
              time:response.data.course.estimatedTime,
              courseId: response.data.course.id,
              userId: response.data.course.userId,
              loading:true
            })
    })
    
    }

    
      render(){
        
        const {
          // title,
          // description,
          // materials,
          // time,
          errorTitle,
          errors,
          // userId,
          // courseId
        } = this.state;
        // const {context} = this.props;
        
        // const authUser = context.authenticatedUser;
        
        return(
          
            <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
            
        <h2 className="validation--errors--label">{errorTitle}</h2>
        <div className="validation-errors">
          <ul>
            <li>{errors}</li>
          </ul>
        </div>
      </div>
      
            <div>
            
              <form onSubmit={this.submit} >
              {(this.state.loading)}
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                        <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        className="input-title course--title--input" 
                        placeholder="Course title..."
                        value={this.state.title} 
                        onChange={this.change} />
                        </div>
                        <p>By {this.state.userName}</p>
                  </div>
                  <div className="course--description">
                  <div>
                        <textarea 
                        id="description" 
                        name="description" 
                        className="" 
                        placeholder="Course description..."
                        value={this.state.description} 
                        onChange={this.change} >
                        </textarea>
                    </div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                            <input 
                            id="time" 
                            name="time" 
                            type="text" 
                            className="course--time--input"
                            placeholder="Hours" 
                            value={this.state.time || ''} 
                            onChange={this.change} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea 
                        id="materials" 
                        name="materials" 
                        className="" 
                        placeholder="List materials..." 
                        value={this.state.materials || ''} 
                        onChange={this.change}>
                        </textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Update Course</button>
                    <Link to={`/courses/${this.props.match.params.id}`}>
                    <button className="button button-secondary" >Cancel</button>
                    </Link>
                    </div>
              </form>
            </div>
          </div>
    
        

        )}

        change = (event) => {
            const name = event.target.name;
            const value = event.target.value;
        
            this.setState(() => {
              return {
                [name]: value
              };
            });
          }


// submit = () => {
//   const {title, description, time, materials, specificCourse} = this.state;
//   const { context } = this.props;

//   const authUser = context.authenticatedUser;
//   const emailAddress = authUser.emailAddress;
//   const password = authUser.password

//   const courseData = {
//     title,
//     description,
//     time,
//     materials
//   }

//   const { match: { params } } = this.props;
//   axios.put(`/api/courses/${params.id}`, courseData, {
//     auth : {
//       username: emailAddress,
//       password,
//     }
//   })
//     .then(() => {
//       this.props.history.push(`/courses/${specificCourse.id}`);
//     })
//     .catch((err) => {
//       const errors = err.response.data.errors;
//       this.setState({ errors })
//     })

// }

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

    const {title, description, time, materials, courseId, userId} = this.state;
    const { context } = this.props;

    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password
  // console.log(authUser.firstName + authUser.lastName + emailAddress + password)

    const course = {
      title,
      description,
      time,
      materials,
      userId : authUser.id,
      courseId
    }

    context.data.updateCourse(course, courseId, emailAddress, password, userId)  
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
