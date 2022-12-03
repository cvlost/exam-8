import React, {useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {CategoryData} from "../../types";
import {Outlet, useOutlet} from "react-router-dom";

interface Props {
  categories: CategoryData[];
}

const Main: React.FC<Props> = (props) => {

  const outlet = useOutlet();
  return (
    <>
      <Sidebar categories={props.categories}/>
      <div className="container-fluid">
        {outlet}
      </div>
    </>

  );
};

export default Main;