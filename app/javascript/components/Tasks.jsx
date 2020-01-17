import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";


class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		};
	}

	componentDidMount() {
		const url = "/tasks/index";
		fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Gycc Json Response Error");
		})
		.then(response => {this.setState({ tasks: response })}
		)
		.catch(() => this.props.history.push("/"));
		//.then(response => this.setState({ tasks: response }))
		//.catch(() => this.props.history.push("/"));

	}

	handleDelete = (taskId) => {
		fetch(`/tasks/${taskId}`, { method: 'delete' }).
			then((response) => {
				if(response.ok) {
					alert("task deleted successfully!")
					return response.json();
				}
				throw new Error("Gycc after delete response error");
			})
			.then(response =>{this.setState({ tasks: response })})
			.catch(() => this.props.history.push("/"));
	}

	handleSearch() {
		const query = ReactDOM.findDOMNode(this.refs.query).value;
		fetch(`/tasks/search?query=${encodeURIComponent(query)}`, { method: 'get' })
		.then(response => response.json())
		.then(response => {
			this.setState({ tasks: response });})
		.catch(() => alert("xixixi"));
	}

	render() {
		const { tasks } = this.state;
		const allTasks = tasks.map((task, index) => (	
			<div key={index} className="container-fluid p-3 bg-light border">
			
			<div className="row">
			
			<div className="col-md-8">
			<h5>{task.title}</h5>
			
			
			</div>
			
			<div className="col-md-4">
			
			<Link to={`/task/${task.id}`} className="btn custom-button">
			View Task
			</Link>
			&nbsp;
			<Link to={`/tasks/${task.id}/edit`} className="btn custom-button">
			Edit Task
			</Link>
			&nbsp;
			<button onClick={() => this.handleDelete(task.id) } className="btn custom-button">
			Delete Task
			</button>
			
			</div>
			
			</div>
			</div>
		));

		const noTask = (
			<div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
				<h4>
				No task yet. <Link to="/task">create one</Link>
				</h4>
			</div>
		);

		return(
			<>
			<section className="jumbotron jumbotron-fluid text-center">
			<div className="container py-5">
				<h1 className="display-4">Tasks</h1>
				<p className="lead text-muted">
					These are your tasks.
				</p>
				<select className="form-control" name="tag" ref="query" onChange={this.handleSearch.bind(this)}>
					<option value="">ALL</option>
					<option value="work">Work</option>
					<option value="family">Family</option>
					<option value="study">Study</option>
					<option value="health">Health</option>
					<option value="social">Social</option>
					<option value="else">Else</option>
				</select>
			</div>
			</section>

			<div className="py-5">
				<main className="container">
					<div className="text-right mb-3">
						<Link to="/task" className="btn custom-button">
						New Task
						</Link>
					</div>
				<div className="row">
					{tasks.length > 0 ? allTasks : noTask}
				</div>
				<Link to="/" className="btn btn-link">
					Home
				</Link>
				</main>
			</div>
			</>
		
		);

	

	}



}

export default Tasks;
