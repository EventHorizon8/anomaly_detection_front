import React from 'react';
import classes from "./TopBar.module.scss";

const TopBar = () => {
  return (
    <div className={classes.TopBar}>
      <div className={classes.TopBar__Menu}>

      </div>
      <div className={classes.TopBar__UserName}>
        Татьяна Бабарина
      </div>
      <div className={classes.TopBar__Exit}>
        выйти
      </div>
    </div>
  )
}

export default TopBar;
