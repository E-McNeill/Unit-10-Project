import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// import Courses from './Courses';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

    constructor(props) {
      super();
      this.state = {
        course: [],
        userName: "",
        title:"",
        description:"",
        materials:"",
        time: "",
        id:"",
        userId:""
      };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/courses/'+ this.props.match.params.id)
        .then(response => {
            // const courseInfo = response.data;
          this.setState({
              course: response.data,
              userName: response.data.course.User.firstName + " " + response.data.course.User.lastName, 
              title: response.data.course.title,
              description: response.data.course.description,
              materials: response.data.course.materialsNeeded,
              time:response.data.course.estimatedTime,
              id:response.data.course.id,
              userId: response.data.course.userId


            })
    })
    
    }
    deleteCourse = (e,  id) => {
      e.preventDefault();
      const { context } = this.props;
      id = this.props.match.params.id
      const authUser = context.authenticatedUser;
      const emailAddress = authUser.emailAddress;
    const password = authUser.password
      console.log(emailAddress)
      console.log(password)
        axios.delete(`http://localhost:5000/api/courses/${id}`, {
        auth: {
          username: emailAddress,
          password
        }
      })
        .then(() => {
          this.props.history.push(`/courses`)
        })
        .catch((err) => {
        })
    }    

    
    render() {
        // const { title, description, estimatedTime, materialsNeeded } = this.state.course;
        // const course = this.state.course;

        return (

<div>
<div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">
        <span>
            {/* <a className="button" href="update-course.html">Update Course</a> */}
            <Link className='button' to={`/courses/${this.state.id}/update`}>Update Course
            </Link>
            <a className="button"  onClick={this.deleteCourse} href="/">Delete Course</a>
        </span>
      <Link className="button button-secondary" to="/courses">Return to List</Link>
     </div> 
    </div>
</div>

<div className="bounds course--detail">
    <div className="grid-66">
    <div className="course--header">
    <h4 className="course--label">Course</h4>
    <h3 className="course--title">{this.state.title}</h3>
    <p>By {this.state.userName}</p>
    </div>
    <div className="course--description">
    <p>{this.state.description}</p>
    </div>
    </div>

    <div className="grid-25 grid-right">
    <div className="course--stats">
    <ul className="course--stats--list">
    <li className="course--stats--list--item">
    <h4>Estimated Time</h4>
    <h3><ReactMarkdown source={this.state.time}/></h3>
    </li>
    <li className="course--stats--list--item">
    <h4>Materials Needed</h4>
    <ul>
    <ReactMarkdown source={this.state.materials} />
        
    </ul>
    </li>



    </ul>
    </div>
    </div>
</div>
</div>

        );
    
    }
    
}
