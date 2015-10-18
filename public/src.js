const {Router, Route, Link} = ReactRouter;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <ul>
        	<li><Link to="/home">Home</Link></li>
        	<li><Link to="/posts">Posts</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div>I am the Home component</div>
    );
  }
});

var Posts = React.createClass({
	getInitialState: function() {
		return {posts: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: '/posts',
			method: 'GET',
			success: function(result) {
				this.setState({posts: result});
			}.bind(this) 
		});
	},
  render: function() {
  	var postComponents = this.state.posts.map(function(post){
  		return <Post key={post.id} data={post}/>;
  	});
    return (
      <div>
      	I am the Post component
	      <ul>
	      	{postComponents}
	      </ul>
	    </div>
    );
  }
});

var Post = React.createClass({
	render: function() {
		return (
			<li>
				<h3>
					{this.props.data.title} by <small>{this.props.data.author}</small>
				</h3>
				<p>{this.props.data.content}</p>
			</li>
		);
	}
});

React.render((
  <Router>
  	<Route path="/" component={App}>
  		<Route path="home" component={Home}/>
  		<Route path="posts" component={Posts}/>
  	</Route>
  </Router>
), document.body);