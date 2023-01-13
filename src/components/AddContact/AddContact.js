import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigator = useNavigate();
  return (
    <Tooltip hasArrow label="Add Contact" >
      <Button onClick={()=>navigator("/newcontact")} borderRadius="50%" p="0" w={16} h={16}>
        <AiOutlinePlus fontSize={32} p="20px" />
      </Button>
    </Tooltip>
  );
};

export default AddContact;
