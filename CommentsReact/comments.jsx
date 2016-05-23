// tutorial14.js
var CommentBox = React.createClass({
  loadComments: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),

    });
  },
  handleCommentSubmit: function(comment) {
   $.ajax({
     url: this.props.url,
     dataType: 'json',
     type: 'POST',
     data: comment,
     success: function(data) {
       this.setState({data: data});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.url, status, err.toString());
     }.bind(this)
   });
 },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadComments();
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});


var CommentList = React.createClass({
    render : function () {
    var commentNodes = this.props.data.map (function(comment){
      return (
        <div>
        <hr/>
          <Comment author = {comment.author}>
          {comment.text}
          </Comment>
        </div>
      )
    });
    return (
      <div>
        {commentNodes}
      </div>
    )
    }
});

var CommentForm = React.createClass({
  getInitialState: function() {
     return {author: '', text: ''};
   },
   handleTextChange: function(e) {
     this.setState({author: e.target.value});
   },
   handleCommentChange: function(e) {
     this.setState({text: e.target.value});
   },
   handleSubmit: function(e) {
   e.preventDefault();
   var author = this.state.author.trim();
   var text = this.state.text.trim();
   if (!text || !author) {
     return;
   }
   this.props.onCommentSubmit({author: author, text: text});
   this.setState({author: '', text: ''});
 },
    render : function () {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" value={this.state.author} onChange={this.handleTextChange} />
          <input type="text" placeholder="Comments" value={this.state.text} onChange={this.handleCommentChange}/>
          <input type="submit" value="Submit" />
        </form>
        </div>
      )
    }
});

var Comment = React.createClass({
  render : function() {
    return (
      <div>
        <h5>{this.props.author}</h5>
        <p>{this.props.children}</p>
      </div>
    )
  }
});

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById('example')
);
