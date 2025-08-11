import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

function Tasklist() {
  const [task, setTask] = useState([]);

  const init = async () => {
    const collectionRef = collection(db, "add-Task");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const combinedDataWithId = { ...doc.data(), id: doc?.id };
        data.push(combinedDataWithId);
      });
      setTask(data);
    });
    return unsubscribe;
  };

  const deleteTask = async (id) => {
    try {
      const documentRef = doc(db, "add-Task", id);
      await deleteDoc(documentRef);
      toast("Record has been deleted");
    } catch (error) {
      toast(error?.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
         <TableHead>ID</TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task.map((task) => {
          return (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>
                <Trash
                  size={16}
                  onClick={() => {
                    deleteTask(task?.id);
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default Tasklist;
