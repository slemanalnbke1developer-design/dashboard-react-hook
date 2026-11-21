import React, { Children, createContext } from "react";
import { useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [num, setNum] = useState(1);
  const colors = [
    { hex: "#f44467", name: "وردي" },
    { hex: "#f5864f", name: "برتقالي" },
    { hex: "#92e405", name: "أخضر" },
    { hex: "#b273ff", name: "بنفسجي" },
    { hex: "#4883e7", name: "أزرق" },
    { hex: "#d3cf00", name: "أصفر" },
  ];
  const [Colorize, setColorize] = useState(colors[0].hex);

  const TaskPriority = ["عالية", "متوسطة", "منخفضة"];

  const [Tasks, setTasks] = useState([]);
  const [Title, setTitle] = useState("");
  const [Priority, setPriority] = useState(TaskPriority[0]);
  const [DescriptionTask, setDescriptionTask] = useState("");
  const [Employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [EmpName, setEmpName] = useState("");
  const addEmployeeToProject = (projectId, employeeName) => {
    if (!employeeName || employeeName.trim() === "")
      return alert("أدخل اسم الموظف");
    const newEmp = {
      id: Date.now(),
      projectId: Number(projectId),
      name: employeeName,
    };
    setEmployee((prev) => [...prev, newEmp]);
    setEmpName("");
  };
  const deleteEmployeeFromProject = (empId) => {
    setEmployee((prev) => prev.filter((emp) => emp.id !== empId));
  };

  const [day, setDay] = useState("");
  const [Status, setStatus] = useState("pending");
  const addproject = () => {
    const newproject = {
      id: num,
      name: Name,
      description: Description,
      color: Colorize,
      employee: Employee,
    };
    setProjects((prev) => [...prev, newproject]);
    setName("");
    setDescription("");
  };
  const addtask = (projectId) => {
    const newtask = {
      id: Date.now(),
      projectId: Number(projectId),
      title: Title,
      description: DescriptionTask,
      Priority: Priority,
      Day: day,
      employee: selectedEmployee,
      status: Status,
    };
    setTasks((task) => [...task, newtask]);
    setTitle("");
    setDescriptionTask("");
    setStatus("pending");
    setSelectedEmployee("");
    setDay("");
    setPriority(TaskPriority[0]);
  };
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setComments((prev) =>
      prev.filter((c) => Number(c.taskId) !== Number(taskId)),
    );
  };

  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id),
    );
    setTasks((prevTasks) =>
      prevTasks.filter((task) => Number(task.projectId) !== Number(id)),
    );
    setEmployee((prev) =>
      prev.filter((emp) => Number(emp.projectId) !== Number(id)),
    );
  };

  const Categorys = ["طب", "هندسة", "علوم", "ديني"];
  const [Books, setBooks] = useState([]);
  const [TitleBook, setTitleBook] = useState("");
  const [DescriptionBook, setDescriptionBook] = useState("");
  const [listAuthor, setlistAuthor] = useState([]);
  const [SerchAuthor, setSerchAuthor] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");
  const [Author, setAuthor] = useState("");
  const [Category, setCategory] = useState(Categorys[0]);
  const [PublicationDate, setPublicationDate] = useState("");
  const [idBook, setIdBook] = useState(1);
  const addBook = () => {
    const newBook = {
      id: idBook,
      title: TitleBook,
      description: DescriptionBook,
      Author: Author,
      Category: Category,
      day: PublicationDate,
      Reviews: [],
    };
    setBooks((Book) => [...Book, newBook]);
    setTitleBook("");
    setDescriptionBook("");
    setAuthor("");
    setPublicationDate("");
    setIdBook(idBook + 1);
    setlistAuthor((list) => [...list, Author]);
  };
  const deletBook = (id) => {
    setBooks((prevBooks) => {
      const bookToDelete = prevBooks.find((item) => item.id === id);
      if (bookToDelete) {
        const authorStillExists = prevBooks.some(
          (item) => item.id !== id && item.Author === bookToDelete.Author,
        );
        if (!authorStillExists) {
          setlistAuthor((prev) =>
            prev.filter((author) => author !== bookToDelete.Author),
          );
        }
      }
      return prevBooks.filter((item) => item.id !== id);
    });
  };
  const addReview = (bookId, reviewText, ratingValue) => {
    const newReview = {
      id: Date.now(),
      text: reviewText,
      rating: Number(ratingValue) || 5,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (Number(book.id) === Number(bookId)) {
          const updatedReviews = book.Reviews
            ? [...book.Reviews, newReview]
            : [newReview];
          return {
            ...book,
            Reviews: updatedReviews,
          };
        }
        return book;
      }),
    );
  };
  const deletReview = (bookId, reviewId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            Reviews: book.Reviews.filter((revi) => revi.id !== reviewId),
          };
        }
        return book;
      }),
    );
  };
  return (
    <AllContext.Provider
      value={{
        Books,
        setBooks,
        TitleBook,
        setTitleBook,
        DescriptionBook,
        setDescriptionBook,
        listAuthor,
        setlistAuthor,
        SerchAuthor,
        setSerchAuthor,
        Author,
        setAuthor,
        Categorys,
        SearchCategory,
        setSearchCategory,
        SearchQuery,
        setSearchQuery,
        Category,
        setCategory,
        PublicationDate,
        setPublicationDate,
        idBook,
        setIdBook,
        addBook,
        deletBook,
        addReview,
        deletReview,

        addproject,
        addtask,
        updateTaskStatus,
        deleteProject,
        deleteTask,

        projects,
        setProjects,
        num,
        setNum,
        Name,
        setName,
        Description,
        setDescription,

        colors,
        Colorize,
        setColorize,

        Tasks,
        setTasks,
        Title,
        setTitle,
        Priority,
        setPriority,
        DescriptionTask,
        setDescriptionTask,

        Employee,
        setEmployee,
        EmpName,
        setEmpName,
        addEmployeeToProject,
        deleteEmployeeFromProject,
        selectedEmployee,
        setSelectedEmployee,

        setDay,
        day,

        Status,
        setStatus,
        TaskPriority,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
