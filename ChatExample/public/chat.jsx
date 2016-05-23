  var socket = io();
  var count = 0;

  var ChatList = React.createClass({
    render : function(){

      var createList = function(list){
        return <li key={list.id}>{list.text}</li>
      };
      return <ul id="messages">{this.props.data.map(createList)}</ul>;
    }
  });

  var Chatbox = React.createClass({
    getInitialState : function (){
      return ({ messages:[] ,msg: "" , focusmsg:""});
    },
    handleChat : function (e){
      this.setState({msg: e.target.value});

    },
    componentDidMount : function(){
      socket.on('chat message',function(msgserver){
        var newmsg = this.state.messages.concat([{text : msgserver , id:Date.now()}])
        this.setState({messages : newmsg});
      }.bind(this));
      socket.on('focusText',function(focusm){
        this.setState({focusmsg : focusm});
      }.bind(this));

    },
    submitForm : function (e){
      e.preventDefault();
      socket.emit('chat message', this.state.msg);
      this.setState({msg : ''});
    },
    focusText : function(){
      socket.emit('focusText',"User is Typing");
    },
    blurText : function(){
      socket.emit('focusText',"");
    },
    componentWillUnmount : function(){
      console.log("Component Unmounted");
    },
    render : function(){
      count++;
      console.log(count);
      return(
        <div>
        <h1>React Chat Example</h1>
            <ChatList data={this.state.messages}/>
            <h4>{this.state.focusmsg}</h4>
            <form onSubmit={this.submitForm}>
              <input value={this.state.msg} onChange={this.handleChat} onFocus={this.focusText} onBlur={this.blurText}/>
              <input type="submit" value="Submit" />
            </form>
        </div>
    )
    }
  });

ReactDOM.render(
  <Chatbox />,
  document.getElementById('chatbox')
);
