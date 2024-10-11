import React, { useEffect, useState } from "react";
import { Button } from "lc_web_ux";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

export const MainScreen = () => {
  useEffect(() => {
    //
  }, []);

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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

      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
