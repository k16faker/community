
import TopicList from "../components/TopicList/TopicList";

{/* <ul>
  {topicList.map((topic) => (
    <li key={topic.key}>
      <Link to={`/board/list?id=${topic.topic}`}>{topic.topic}</Link>
    </li>
  ))}
</ul>; */}

const MainPage = () => {

  return (
    <div>
      <TopicList />
    </div>
  );
};

export default MainPage;
