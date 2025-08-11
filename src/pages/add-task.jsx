import Layout from "../components/layout/layout";
import Addtask from "../components/add-task";
import Tasklist from "../components/task-list";

export default function AddTaskComp() {
  return (
    <>
      <Layout>
        <div className="flex justify-end items-center p-2">
          <Addtask />
        </div>
        <div className="p-2">
          <Tasklist/>
        </div>
      </Layout>
    </>
  );
}
