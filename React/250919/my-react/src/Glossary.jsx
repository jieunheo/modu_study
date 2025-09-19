import React, { Fragment } from "react";

const items = [
  { id: 1, name: "Apple", desc: "빨간건 사과" },
  { id: 2, name: "Banana", desc: "바나나는 길어" },
  { id: 3, name: "Cherry", desc: "체리는 비싸" },
];

// function ListItem({ item }) {
//   return (
//     <React.Fragment>
//       <dt>{item.name}</dt>
//       <dd>{item.desc}</dd>
//     </React.Fragment>
//   );
// }

// function Glossary(props) {
//   return (
//     <dl>
//       {props.items.map((item) => (
//         <ListItem item={item} key={item.id} />
//       ))}
//     </dl>
//   );
// }

function Glossary(props) {
  const list = props.items.map((item) => (
    <React.Fragment key={item.id}>
      <dt>{item.name}</dt>
      <dd>{item.desc}</dd>
    </React.Fragment>
  ));
  return <dl>{list}</dl>;
}

function GlossaryFragment() {
  return <Glossary items={items} />;
}

export default GlossaryFragment;
