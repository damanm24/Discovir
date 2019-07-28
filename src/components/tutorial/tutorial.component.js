import React from "react";
import { makeStyles } from "@material-ui/core/styles";


function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  }
}));

export default function Tutorial() {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="tutorial-title">Tutorial:</h2>
      <div id="tutorial-content">
        <ul>
          <li>Click on a node to reveal the information of the object</li>
          <li>
            Clicking two users or two artists sequentially will allow you to
            compare the two entities
          </li>
          <li>
            Take advantage of repositioning the nodes by dragging and dropping
            the nodes with your mouse
            <ul>
              <li>
                Double clicking the node you have repositioned moves it back
                into place
              </li>
            </ul>
          </li>
          <li>
            You can also zoom in/out with with your trackpad or mouse weel, and
            pan by clicking and dragging
          </li>
        </ul>
        <br />
        <br />
        <p>Click outside this box to begin exploring</p>
      </div>
    </div>
  );
}
