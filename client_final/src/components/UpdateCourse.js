import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateCourse extends Component {

    constructor(props) {
        super();
        this.state = {
          specificCourse: [],
          userName: "",
          courseTitle:"",
          courseDescription:"",
          materials:"",
          time: "",
          errors: []
        };
      }
  
      componentDidMount(){
        axios.get('http://localhost:5000/api/courses/'+ this.props.match.params.id)
        .then(response => {
            // const courseInfo = response.data;
          this.setState({
              specificCourse: response.data,
              userName: response.data.course.User.firstName + " " + response.data.course.User.lastName, 
              courseTitle: response.data.course.title,
              courseDescription: response.data.course.description,
              materials: response.data.course.materialsNeeded,
              time:response.data.course.estimatedTime
            })
    })
    
    }

    
      render(){
        return(
            <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form onSubmit={this.submit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                        <input 
                        id="courseTitle" 
                        name="courseTitle" 
                        type="text" 
                        className="input-title course--title--input" 
                        placeholder="Course title..."
                        value={this.state.courseTitle} 
                        onChange={this.change} />
                        </div>
                        <p>By {this.state.userName}</p>
                  </div>
                  <div className="course--description">
                  <div>
                        <textarea 
                        id="courseDescription" 
                        name="courseDescription" 
                        className="" 
                        placeholder="Course description..."
                        value={this.state.courseDescription} 
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
                            value={this.state.time} 
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
                        value={this.state.materials} 
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

//           submit = () => {
//             const { context } = this.props;
//             const {
//                 courseTitle,
//                 courseDescription,
//                 materials,
//                 time,
//                   } = this.state;
        
// }

submit = (e) => {
    const {match: { params }} = this.props;
    e.preventDefault();
      axios ({
          method: 'put',
          url: `http://localhost:5000/api/courses/${params.id}`,
          auth: {
            username: window.localStorage.getItem('emailAddress'),
            password: window.localStorage.getItem('password')
         },
          data: {
              courseTitle: this.state.title,
              courseDescription: this.state.description,
              materials: this.state.materialsNeeded,
              time: this.state.estimatedTime,


              }
      }).then(response => { 
        if (response.status === 204) {
          alert(`Your course ${this.state.title} has been updated`);
          this.props.history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log("CATCH =", err.response.data.errors);
        this.setState({
          errors: err.response.data.errors
        });
      });
  };

}
