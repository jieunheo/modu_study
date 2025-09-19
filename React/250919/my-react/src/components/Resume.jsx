import "./Resume.css";

function Resume(props) {
  return (
    <div className="resume">
      <h1>{props.name} 자기소개서</h1>
      <h2>{props.hello}</h2>
      <p>취미 : {props.hobby}</p>
      <p>좋아하는 음식 : {props.food}</p>
      <p>
        좋아하는 색 : <span style={{ color: props.color }}>{props.color}</span>
      </p>
    </div>
  );
}

export default Resume;
