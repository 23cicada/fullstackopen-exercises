import Person from "./Person";

const Persons = ({ persons, onDelete }) => {
  return persons.map((person, index) => (
    <Person key={index} person={person} onDelete={onDelete} />
  ));
};

export default Persons
