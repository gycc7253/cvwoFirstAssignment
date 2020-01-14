import React from "react";
import { Link } from "react-router-dom";

class UpdateTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			date: "",
			category: ""
		};
	
		this.onChange = this.onChange.bind(this);
		this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	}
	
	
	stripHtmlEntities(str) {
		return String(str)
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

	}

	componentDidMount() {
		const { match: {params: { id } } } = this.props;
		fetch(`/show/${id}`).
			then((response) => response.json()).
			then((task) => this.setState({ ...task }));
	}


	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	updateTaskRequest = (event) => {
		fetch(`/tasks/${this.state.id}`, {
			method: 'put',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
			alert('Task updated successfully!');
			location.href = `/task/${this.state.id}`;
		});
	}

	render() {
		const {title, description, date, category} = this.state;
		return(
			<div className="container-fluid mt-5">
				<div className="row">
				<div className="col-sm-12 col-lg-6 offset-lg-3">
					<h1 className="font-weight-normal mb-5">
						Update Task
					</h1>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
						<label htmlFor="taskTitle">Title</label>
						<input
							type="text"
							name="title"
							id="taskTitle"
							value={title}
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
							value={description}
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
							value={date}
							required
							className="form-control"
							onChange={this.onChange}
						/>
						
						<label htmlFor="taskCategory">Category</label>
						
						<select name="category" className="form-control" value={category} onChange={this.onChange}>
							<option value="work">Work</option>
							<option value="family">Family</option>
							<option value="study">Study</option>
							<option value="health">Health</option>
							<option value="else">Else</option>
						</select>
						<button onClick={this.updateTaskRequest}  className="btn custom-button mt-3">
						Edit Task
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

export default UpdateTask;
