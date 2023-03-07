import "./Msg.css";

export function MyMsg(props) {
  return <div className="message-box mine">{props.children}</div>;
}
