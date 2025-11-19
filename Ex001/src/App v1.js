import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion({ faqs }) {
  const [openID, setOpenID] = useState(null);

  function handleClick(id) {
    if (id === openID) setOpenID(null);
    else setOpenID(id);
  }
  return (
    <ul className={"accordion"}>
      {faqs.map((item, i) => (
        <AccordionItem
          id={i}
          title={item.title}
          text={item.text}
          handleClick={handleClick}
          openID={openID}
          key={item.title}
        />
      ))}
    </ul>
  );
}

function AccordionItem({ id, title, text, handleClick, openID }) {
  return (
    <li
      className={`item  ${openID === id && "open"}`}
      onClick={(e) => handleClick(id)}
    >
      <p className="number">{id <= 9 ? `${"0" + id}` : id}</p>
      <p className="text">{title}</p>
      <p className="icon">{openID === id ? "-" : "+"}</p>
      {openID === id && <div className="content-box">{text}</div>}
    </li>
  );
}
