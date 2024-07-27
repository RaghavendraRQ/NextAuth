import HeroComponent from "@/components/Hero";
import SearchBarComponent from "@/components/SearchBar";

export default function Home() {
  return (
    <main>
      <HeroComponent/>
      <SearchBarComponent/>
      <div className="flex items-center justify-around mx-4 my-8">
        {/* <TodayTasksComponent title="Today's Tasks" todoList={todoList}/>
        <TodayTasksComponent title="Tomorrow's Tasks" todoList={todoList}/>
        <TodayTasksComponent title="This week Tasks" todoList={todoList}/> */}
      </div>
    </main>
  );
}
