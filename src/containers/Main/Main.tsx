import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {CategoryData} from "../../types";
import {Outlet} from "react-router-dom";

interface Props {
  categories: CategoryData[];
}

const Main: React.FC<Props> = (props) => {
  return (
    <>
      <Sidebar categories={props.categories}/>
      <div className="container-fluid">
        <Outlet/>
      </div>
    </>

  );
};

export default Main;