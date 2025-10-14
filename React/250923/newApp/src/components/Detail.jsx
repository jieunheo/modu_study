import { useState } from "react";

function AnimalForm({ addAnimal }) {
  // 상태 관리
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    // 유효성 검사
    if (!name || !species || !age) return alert("모든 항목을 입력해주세요!");

    // 동물 추가
    addAnimal({
      name: name,
      species: species,
      age: parseInt(age),
    });

    // 폼 리셋
    setName("");
    setSpecies("");
    setAge("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>새로운 애완동물을 추가하세요!</legend>
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={(e) => setName(e.target.value)} // 입력 값 변경 시 상태 업데이트
          value={name} // 상태 값 반영
        />
        <input
          type="text"
          name="species"
          placeholder="species"
          onChange={(e) => setSpecies(e.target.value)}
          value={species}
        />
        <input
          type="number"
          min={0}
          name="age"
          placeholder="나이"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <button type="submit">추가하기</button>
      </fieldset>
    </form>
  );
}

function AnimalItem({ animal }) {
  return (
    <li>
      {animal.name}는 {animal.species}입니다 그리고 {animal.age}살 입니다.
    </li>
  );
}

function AnimalList({ animalList }) {
  return (
    <ul>
      {animalList.map((animal) => (
        <AnimalItem key={animal.id} animal={animal} />
      ))}
    </ul>
  );
}

function Detail() {
  // 현재 기분의 상태를 관리하는 훅
  const [animalList, setAnimalList] = useState([
    { name: "벨라", species: "고양이", age: "5", id: 111 },
    { name: "루시", species: "강아지", age: "3", id: 112 },
    { name: "데이지", species: "토끼", age: "2", id: 113 },
    { name: "몰리", species: "고양이", age: "1", id: 114 },
    { name: "매기", species: "강아지", age: "6", id: 115 },
  ]);

  function addAnimal(newAnimal) {
    setAnimalList((prev) => {
      newAnimal.id = prev[prev.length - 1].id + 1 || 111;
      return [...prev, newAnimal];
    });
  }
  return (
    <div>
      <h1>애완동물 정보 리스트</h1>
      <AnimalForm addAnimal={addAnimal} />
      <AnimalList animalList={animalList} />
    </div>
  );
}

export default Detail;
