import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {CategoryData} from "../../types";
import {Outlet} from "react-router-dom";

interface Props {
  categories: CategoryData[];
  isFetch: boolean;
}

const Main: React.FC<Props> = ({categories, isFetch}) => {
  return (
    <>
      <Sidebar showPreloader={isFetch} categories={categories}/>
      <div className="container-fluid">
        <Outlet/>
      </div>
    </>

  );
};

export default Main;