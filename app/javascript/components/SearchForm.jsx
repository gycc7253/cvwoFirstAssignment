import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import $ from "jquery";

class SearchForm extends React.Component {
	handleSearch() {
		var query = ReactDOM.findDOMNode(this.refs.query).value;
		var self = this;
		$.ajax({
			url: '/tasks/search',
			data: { query: query },
			success: function(data) {
				self.props.handleSearch(data);
			},
			error: function(xhr, status, error) {
				alert('search error: ', status, xhr, error);
			}
		});
	}

	render() {
		return(
			<input onChange={this.handleSearch.bind(this)}
				type="text"
				className="form-control"
				placeholder="Type search phrase here..."
				ref="query" />
		)
	
	}

}

export default SearchForm;
