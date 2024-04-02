//게시판 주제 리스트


import { Link } from "react-router-dom";

const topicList = [
  {
    title: "리그오브레전드",
    topic: "lol",
    key: "1",
    type: "game",
  },
  {
    title: "메이플스토리",
    topic: "maplestory",
    key: "2",
    type: "game",
  },
  {
    title: "웹개발",
    topic: "webdev",
    key: "3",
    type: "develop",
  },
  {
    title: "주식",
    topic: "stock",
    key: "4",
    type: "finance",
  },
];

const TopicDiv = ({ topic, title }) => {
  return (
    <div className="border-2 border-slate-800 text-center w-[200px]">
      <div className="flex items-center w-full h-[40px] border-b bg-slate-700 text-white">
        <h1 className="mx-auto">{title}</h1>
      </div>
      <ul className="my-[20px]">
        {topic.map((e) => (
          <li key={e.key}>
            <Link to={`/board/list?id=${e.topic}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TopicList = () => {
  const games = topicList.filter((topic) => topic.type === "game");
  const finances = topicList.filter((topic) => topic.type === "finance");
  const develops = topicList.filter((topic) => topic.type === "develop");

  return (
    <section className="flex w-[1000px] mx-auto mt-[50px] justify-between p-[15px]">
      <TopicDiv topic={games} title='게임' />
      <TopicDiv topic={develops} title='개발' />
      <TopicDiv topic={finances} title='재무' />
    </section>
  );
};

export default TopicList;
