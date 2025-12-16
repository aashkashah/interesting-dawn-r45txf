import "./styles.css";
import { useState } from "react";

export default function App() {
  type Person = {
    id: number;
    name: string;
    team: "Eng" | "Design" | "PM";
    active: boolean;
  };

  const PEOPLE: Person[] = [
    { id: 1, name: "Asha", team: "Eng", active: true },
    { id: 2, name: "Mina", team: "Design", active: true },
    { id: 3, name: "Ravi", team: "PM", active: false },
    { id: 4, name: "Zoe", team: "Eng", active: false },
    { id: 5, name: "Luis", team: "Design", active: true },
  ];

  const [people] = useState<Person[]>(PEOPLE);
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState<"All" | Person["team"]>("All");
  const [activeOnly, setActiveOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTeam = team === "All" || person.team === team;
    const matchesActive = person.active || !activeOnly;

    return matchesSearch && matchesTeam && matchesActive;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  return (
    <div className="App">
      <h1>People Directory</h1>
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={team} onChange={(e) => setTeam(e.target.value as any)}>
        <option value="All">All</option>
        <option value="Eng">Eng</option>
        <option value="Design">Design</option>
        <option value="PM">PM</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={activeOnly}
          onChange={(e) => setActiveOnly(e.target.checked)}
        />
        Active Only
      </label>
      <button onClick={() => setSortAsc((s) => !s)}>
        Sort {sortAsc ? "Z → A" : "A → Z"}
      </button>

      <ul>
        {sortedPeople.map((person) => (
          <li key={person.id}>
            {person.name} — {person.team} {person.active ? "(Active)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
