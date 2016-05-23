var FirstChild = React.createClass({
render : function(){
    return (
    <p>
      I am first child.
    </p>
    );
  }
});

var SecondChild = React.createClass({
render : function(){
    return (
    <p>
      I am second child.
    </p>
    );
  }
});

var route1 = <FirstChild />;
var Parent = React.createClass({

getInitialState: function() {
  return {route: route1};
},
interval : function(){
  this.setState({route : <SecondChild/>});
  setInterval(this.intervalTwo, 2000);
},
intervalTwo : function (){
  //console.log(typeof this.state.route);
  this.setState({route : route1});
},
componentDidMount : function(){
  setInterval(this.interval, 3000);
},
render : function(){
return (
<div>
{
  (this.state.route)
  }
</div>
)
}
});


ReactDOM.render(
  <Parent />,
  document.getElementById('example')
)
