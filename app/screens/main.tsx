import React, { useEffect, useState } from "react";
import { Button } from "lc_web_ux";

export const MainScreen = () => {
  useEffect(() => {
    //
  }, []);

  return (
    <div className="">
      <div>Hello</div>
      <Button
        label="World"
        className="bg-blue-500"
        onClick={() => {
          alert("click");
        }}
      />
    </div>
  );
};
