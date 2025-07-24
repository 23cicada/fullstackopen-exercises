import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table style={{ textAlign: "left" }}>
      <tr>
        <th colSpan={2}>statistics</th>
      </tr>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(good - bad) / all} />
      <StatisticLine text="positive" value={(good / all) * 100 + " %"} />
    </table>
  );
};

export default Statistics;
