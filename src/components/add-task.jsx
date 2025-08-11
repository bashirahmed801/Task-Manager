import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { db } from "../firebase";

function Addtask() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    deadline: "",
  };
  const addTaskSchema = Yup.object().shape({
    name: Yup.string().required("task Name is required"),
    description: Yup.string().required("description is required"),
    deadline: Yup.string()
      .required("deadline is Required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addTaskSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "add-Task");
        const data = {
          name: values.name,
         description: values.description,
          deadline: values.deadline,
          timestamp: serverTimestamp(),
        };
        const docRef = await addDoc(collectionRef, data);
        if (docRef) {
          formik.resetForm();
          toast("Task record has been added!");
        }
      } catch (error) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add TASK</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Please insert task details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter Your Task Name"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.name}
              </span>
            )}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Description"
              />
            </div>
            {formik.errors.description && formik.touched.description && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.description}
              </span>
            )}
            <div className="grid gap-3">
              <Label htmlFor="deadline">deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="deadline"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                placeholder="deadline"
              />
            </div>
            {formik.errors.deadline && formik.touched.deadline && (
              <span className="text-red-500 text-[12px]">
                {formik.errors.deadline}
              </span>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                formik.submitForm();
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default Addtask;
