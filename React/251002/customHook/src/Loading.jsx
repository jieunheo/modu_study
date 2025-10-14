import React from "react";
import loadingImg from "../imgs/loading.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div>
      <img src={loadingImg} alt="" className="imgLoading" />
    </div>
  );
}
