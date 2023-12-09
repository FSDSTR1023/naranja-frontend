import TaskCard from '../components/TaskCard';
const task = {
  id: "2312",
  title: "TITULO",
  description: "DESCRIPCIÓN",
  status: "STATUS",
  dateStart: "2022-01-01 ", // Use a valid date string here
  dateEnd: "2022-01-02 ", // And here
};


const TaskPage = () => {
 
  return (
    
    <TaskCard task={task}/>
   
  );
};

export default TaskPage;


