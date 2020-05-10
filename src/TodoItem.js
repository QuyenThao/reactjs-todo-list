import React, { Component } from "react";
import classNames from "classnames";
import "./TodoItem.css";
import checkImg from "./img/check.png";
import checkCompleteImg from "./img/check-complete.png";
import deleteBtn from "./img/delete.png";

class TodoItem extends Component {
  render() {
    const { item, onClick, onDelete } = this.props;
    let url = checkImg;
    if (item.isComplete) {
      url = checkCompleteImg;
    }
    return (
      <div
        className={classNames("TodoItem", {
          "TodoItem-complete": item.isComplete
        })}
      >
        <img onClick={onClick} src={url} alt="" width="32" height="32" />
        <p>{this.props.item.title}</p>
        <img
          className="deleteBtn"
          onClick={onDelete}
          src={deleteBtn}
          alt=""
          width="15"
          height="15"
        />
      </div>
    );
  }
}

export default TodoItem;
