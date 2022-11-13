import { useRef } from "react";
import Form from "./components/Form";
import Invite from "./components/Invite";

export default function Home() {
  const formRef = useRef(null);
  return (
    <div className="scrollbar-thin scrollbar-thumb-[#DCB974]/40 scrollbar-track-[#031934]/40 ">
      <Invite formRef={formRef} />
      <Form formRef={formRef} />
    </div>
  );
}
