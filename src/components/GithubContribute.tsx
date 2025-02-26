import GitHubCalendar from "react-github-calendar";

const GithubContribute = () => {
  return (
    <div className="flex justify-center mb-36">
      <GitHubCalendar
        username="NIU-BIN"
        blockSize={14}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default GithubContribute;
