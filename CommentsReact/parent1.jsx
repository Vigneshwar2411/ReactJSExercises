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


var x= 5;
var x1 = 5;
var y= new Number(5);
var z = y;
var y1 = new Number(5);
var z1 = y1;



console.log(z==z1);
console.log(Object.is(x1,x));

console.log(z===z1);
console.log(typeof x1);



var route1 = <FirstChild />;
var route2 = <SecondChild />;
var Parent = React.createClass({

getInitialState: function() {
  return {route: route1};
},
clickFunction : function(){
    (this.state.route) == route2 ? (this.setState({route : route1})) : (this.setState({route : route2}))
},

render : function(){
return (
<div onClick = {this.clickFunction} >
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
);
