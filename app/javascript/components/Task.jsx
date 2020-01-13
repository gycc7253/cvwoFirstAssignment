import React from "react";
import { Link } from "react-router-dom";

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: "" 
		};

		
	}

	componentDidMount(){
		const {
			match: {
				params: { id }
			}
		} = this.props;

		const url = `/show/${id}`;

		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok gycc here");
			})
			.then(response => this.setState({ task: response }))
			.catch(() => this.props.history.push("/tasks"));

	}

	render() {
		const { task } = this.state;
		let taskList = "No task available";

		return(
			
			<div className="container-fluid p-5 my-3 bg-light">
				<h1>{task.title}</h1>
				<p className="text-muted">Task Description: {task.description}</p>
				<p className="text-muted">Deadline: {task.date}</p>
				<p className="text-muted">Category: {task.category}</p>
				<Link to="/tasks" className="btn btn-link">
					Back to Tasks
				</Link>
			</div>
			
			
		);
	


	}

}

export default Task;
