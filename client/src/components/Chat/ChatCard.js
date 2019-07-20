import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";


class ChatCard extends Component {

  render() {
    const props = this.props;
    var leftOrRight = '';
    // if(props.sender._id === this.props.user.userData._id ) {
    //     leftOrRight = 'floatRight';
    // } else {
    //     leftOrRight = 'floatLeft';
    // }

    return (
      <div className={` ${leftOrRight} `} style={{width:'100%'}}>
       <List className="CommentWrapper">
        <ListItem >
   
            <ListItemText
              primary={props.message}
              secondary={
                <React.Fragment> 
                <span className="CommentText">
                  {props.sender.name}
                </span> 
                · {moment(props.createdAt).toNow(true)} ago
                
                </React.Fragment>
                }
              />
          </ListItem>    
        </List>
      </div>
  
  )    
 }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ChatCard);

