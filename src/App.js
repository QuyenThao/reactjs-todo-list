import React, { Component } from "react";
import classNames from "classnames";
import TodoItem from "./TodoItem";
import "./TodoItem.css";
import tick from "./img/tick.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      allComplete: "true",
      currentFilter: "all",
      todoItems: [
        { title: "Buy snacks", isComplete: true },
        { title: "Go shopping", isComplete: false },
        { title: "Go home", isComplete: true }
      ]
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAllItemsClick = this.onAllItemsClick.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onItemsleft = this.onItemsleft.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
  }

  onItemClicked(item) {
    return event => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  onDeleteItem(item) {
    return event => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      const deleteItem = todoItems.splice(index, 1);
      this.setState({
        todoItems: todoItems
      });
    };
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      // Enter Key
      let text = event.target.value;
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: "",
        todoItems: [{ title: text, isComplete: false }, ...this.state.todoItems]
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }

  onAllItemsClick() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map(item => ({
        ...item,
        isComplete: this.state.allComplete
      })),
      allComplete: !this.state.allComplete
    });
  }

  onItemsleft() {
    const { todoItems } = this.state;
    return todoItems.filter(item => item.isComplete === false).length;
  }

  onFilterItemsToShow(s) {
    this.setState({
      currentFilter: s
    });
  }

  onClearCompleted() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.filter(item => {
        return item.isComplete === false;
      })
    });
  }

  render() {
    const { todoItems, newItem, currentFilter } = this.state;
    let todos = [];

    if (currentFilter === "all") {
      todos = todoItems;
    } else if (currentFilter === "active") {
      todos = todoItems.filter(item => item.isComplete === false);
    } else if (currentFilter === "completed") {
      todos = todoItems.filter(item => item.isComplete === true);
    }

    if (todoItems.length) {
      return (
        <div className="Todo">
          <div className="Header">
            <img src={tick} alt="" onClick={this.onAllItemsClick} />
            <input
              type="text"
              value={newItem}
              onChange={this.onChange}
              placeholder="What needs to be done ?"
              onKeyUp={this.onKeyUp}
            />
          </div>
          {todos.length > 0 &&
            todos.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)}
                onDelete={this.onDeleteItem(item)}
              />
            ))}
          <div className="Footer">
            <span>{this.onItemsleft()} item(s) left</span>
            <ul className="filter">
              <li
                className={classNames({ "on-active": currentFilter === "all" })}
                onClick={() => this.onFilterItemsToShow("all")}
              >
                All
              </li>
              <li
                className={classNames({
                  "on-active": currentFilter === "active"
                })}
                onClick={() => this.onFilterItemsToShow("active")}
              >
                Active
              </li>
              <li
                className={classNames({
                  "on-active": currentFilter === "completed"
                })}
                onClick={() => this.onFilterItemsToShow("completed")}
              >
                Completed
              </li>
            </ul>
            <a href="# " onClick={this.onClearCompleted}>
              Clear completed
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Todo">
          <div className="Header">
            <img src={tick} alt="" onClick={this.onAllItemsClick} />
            <input
              type="text"
              value={newItem}
              onChange={this.onChange}
              placeholder="What needs to be done ?"
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
      );
    }
  }
}
export default App;
