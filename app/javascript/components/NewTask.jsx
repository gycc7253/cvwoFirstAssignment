import React from "react";
import { Link } from "react-router-dom";

class NewTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			date: "",
			category: ""
		};
	
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	}
	
	
	stripHtmlEntities(str) {
		return String(str)
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

	}


	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/tasks/create";
		const { title, description, date, category } = this.state;

		const body = {
			title,
			description,
			date,
			category
		};

		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "POST",
			headers: {
				"X-CSRF-Token": token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok creating gycc");
			})
			.then(response => this.props.history.push("/tasks"))
			.catch(error => console.log(error.message));
	}

	render() {
		return(
			<div className="container-fluid mt-5">
				<div className="row">
				<div className="col-sm-12 col-lg-6 offset-lg-3">
					<h1 className="font-weight-normal mb-5">
						Create a New Task
					</h1>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
						<label htmlFor="taskTitle">Title</label>
						<input
							type="text"
							name="title"
							id="taskTitle"
							className="form-control"
							required
							onChange={this.onChange}
						/>
						</div>
						
						<div className="form-group">
						<label htmlFor="taskDescription">Description</label>
						<input
							type="textarea"
							name="description"
							id="taskDescription"
							className="form-control"
							required
							onChange={this.onChange}
						/>
						</div>
						
						<label htmlFor="taskDate">date</label>
						<input
							type="date"
							name="date"
							id="taskDate"
							required
							className="form-control"
							onChange={this.onChange}
						/>
						
						<label htmlFor="taskCategory">Category</label>
						<input 
							type="text"
							name="category"
							id="taskCategory"
							required
							className="form-control"
							onChange={this.onChange}
						/>
						<button type="submit"  className="btn custom-button mt-3">
						Create Task
						</button>
						<Link to="/tasks" className="btn btn-link mt-3">
						Back to Tasks
						</Link>
					</form>
				</div>
				</div>
			</div>
		);

	}
}

export default NewTask;
