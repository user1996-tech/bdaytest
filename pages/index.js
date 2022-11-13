import { useRef } from "react";
import Form from "./components/Form";
import Invite from "./components/Invite";

export default function Home() {
  const formRef = useRef(null);
  return (
    <div className="scrollbar-hide">
      <Invite formRef={formRef} />
      <Form formRef={formRef} />
    </div>
  );
}
