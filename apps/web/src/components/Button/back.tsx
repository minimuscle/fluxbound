import { Flex } from "@mantine/core";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useNavigate, type ToOptions } from "@tanstack/react-router";
import type React from "react";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type BackButton = React.FC<{
  to: ToOptions["to"];
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const BackButton: BackButton = ({ to }) => {
  /***** STATE *****/
  const navigate = useNavigate();

  /***** RENDER *****/
  return (
    <button onClick={() => navigate({ to })} className="Button__back">
      <Flex align="center">
        <CaretLeftIcon size={20} />
        Back
      </Flex>
    </button>
  );
};
