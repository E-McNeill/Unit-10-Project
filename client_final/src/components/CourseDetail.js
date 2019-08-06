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
        materialsNeeded:"",
        estimatedTime: "",
        id:"",
        userId:"",
      };
    }

    //pulls specific course info with axios on load
    componentDidMount(){
        axios.get('http://localhost:5000/api/courses/'+ this.props.match.params.id)
        .then(response => {
          this.setState({
              course: response.data,
              userName: response.data.course.User.firstName + " " + response.data.course.User.lastName, 
              title: response.data.course.title,
              description: response.data.course.description,
              materialsNeeded: response.data.course.materialsNeeded,
              estimatedTime:response.data.course.estimatedTime,
              id:response.data.course.id,
              // firstName: response.data.course.User.firstName, 
              userId: response.data.course.userId,
              


            })
            
    
    })
    
    }
    //deletes the specific course if user is authorized
    deleteCourse = (e,  id) => {
      e.preventDefault();
      const { context } = this.props;
      id = this.props.match.params.id
      const authUser = context.authenticatedUser;
      const emailAddress = authUser.emailAddress;
    const password = authUser.password

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
        const { context } = this.props;   

        return (

<div>
<div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">
          { 
            
            context.authenticatedUser && this.state.userId === context.authenticatedUser.id 


          ? (
            <React.Fragment>
              <span>
            <Link className='button' to={`/courses/${this.state.id}/update`}>Update Course
            </Link>
            <a className="button"  onClick={this.deleteCourse} href="/">Delete Course</a>
                    </span>

                    </React.Fragment>
                    ) : (<React.Fragment>

                      <h3>Sign in to update and delete courses</h3>
                      <br></br>
                      </React.Fragment>)}
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
    {/* <p> */}
      <ReactMarkdown source={this.state.description}/>
    {/* </p> */}
    </div>
    </div>

    <div className="grid-25 grid-right">
    <div className="course--stats">
    <ul className="course--stats--list">
    <li className="course--stats--list--item">
    <h4>Estimated Time</h4>
    <h3>{this.state.estimatedTime}</h3>

    </li>
    <li className="course--stats--list--item">
    <h4>Materials Needed</h4>
    <ul>
    <ReactMarkdown source={this.state.materialsNeeded} />
        
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
