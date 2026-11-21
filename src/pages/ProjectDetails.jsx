import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AllContext } from "../Context";
import { FaTrash } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormGroup,
  Card,
  Dropdown,
} from "react-bootstrap";

const ProjectDetailsPage = () => {
  const {
    projects,
    Tasks,
    deleteTask,
    addtask,
    Title,
    setTitle,
    TaskPriority,
    Priority,
    setPriority,
    DescriptionTask,
    setDescriptionTask,
    Employee,
    EmpName,
    setEmpName,
    addEmployeeToProject,
    setSelectedEmployee,
    selectedEmployee,
    deleteEmployeeFromProject,
    day,
    setDay,
    updateTaskStatus,
  } = useContext(AllContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEmpModal, setShowEmpModal] = useState(false);
  const handleCloseEmp = () => setShowEmpModal(false);
  const handleShowEmp = () => setShowEmpModal(true);

  const { id } = useParams();
  const currentProjectId = Number(id);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showComment, setShowcomment] = useState(false);

  const handleCloseEComm = () => {
    setShowcomment(false);
    setActiveTaskId(null);
    setCommentText("");
  };

  const handleShowEComm = (taskId) => {
    setActiveTaskId(taskId);
    setShowcomment(true);
  };

  const handleAddComment = () => {
    if (!commentText || commentText.trim() === "") return;
    const newComment = {
      id: Date.now(),
      taskId: activeTaskId,
      text: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const currentEmployee = Employee.filter(
    (emp) => Number(emp.projectId) === Number(currentProjectId),
  );
  const selectedDate = new Date(day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  const handleSaveAll = () => {
    if (!Title || Title.trim() === "") {
      alert("الرجاء ادخال اسم المهمة");
      return;
    } else if (!DescriptionTask || DescriptionTask.trim() === "") {
      alert("الرجاء ادخال وصف المهمة");
      return;
    } else if (!day) {
      alert("الرجاء اختيار تاريخ المهمة");
      return;
    } else if (selectedDate < today) {
      alert("لا يمكن اختيار تاريخ سابق");
      return;
    } else if (currentEmployee.length === 0) {
      alert("قم باضافة موظفين");
      return;
    }
    addtask(currentProjectId);
    handleClose();
  };

  const currentProject = projects.find((p) => p.id === currentProjectId);
  const projectTasks = Tasks.filter(
    (task) => Number(task.projectId) === Number(currentProjectId),
  );

  const pendingTasks = projectTasks.filter((task) => task.status === "pending");
  const inProgressTasks = projectTasks.filter(
    (task) => task.status === "in-progress",
  );
  const completedTasks = projectTasks.filter(
    (task) => task.status === "completed",
  );

  return (
    <Container className="mt-4">
      <Row>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-dark">{currentProject?.name}</h2>
            <div className="d-flex align-items-center">
              <h5 className="text-muted ms-1 me-2 mt-2 pt-1">
                {currentProject?.description}
              </h5>
              {currentEmployee
                ? currentEmployee.map((item) => (
                    <h6
                      className="ms-2 mt-3 py-1 px-3 bg-light text-primary rounded-pill border border-2"
                      key={item.id}
                    >
                      {item.name}
                    </h6>
                  ))
                : ""}
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button className="btn btn-success" onClick={handleShowEmp}>
              + إدارة الموظفين
            </Button>
            <Button className="btn btn-primary" onClick={handleShow}>
              + إضافة مهمة
            </Button>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            className="mb-5 pb-5"
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">
                إضافة مهمة جديدة
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
              <FormGroup>
                <Form.Control
                  type="text"
                  dir="rtl"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control mb-3"
                  placeholder="ادخل اسم المهمة"
                />
                <Form.Control
                  type="text"
                  dir="rtl"
                  value={DescriptionTask}
                  onChange={(e) => setDescriptionTask(e.target.value)}
                  className="form-control mb-3"
                  placeholder="ادخل وصف المهمة"
                />
                <Dropdown className="w-100" drop="down">
                  <Dropdown.Toggle
                    className="w-100 border border-1 mb-3"
                    variant="light"
                  >
                    {Priority}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {TaskPriority.map((item) => (
                      <Dropdown.Item
                        key={item}
                        onClick={() => setPriority(item)}
                        className="d-flex align-items-center gap-2 py-2"
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type="date"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="form-control mb-3 bg-white"
                />
              </FormGroup>
              {currentEmployee.length > 0 ? (
                <Dropdown className="w-100" drop="down">
                  <Dropdown.Toggle
                    className="w-100 border border-1"
                    variant="light"
                  >
                    {selectedEmployee || "اختر الموظف"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {currentEmployee.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => setSelectedEmployee(item.name)}
                        className="d-flex align-items-center gap-2 py-2"
                      >
                        {item.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <h6 className="text-danger text-center">
                  لايوجد موظفين في هذا المشروع، قم بإضافتهم أولاً
                </h6>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إغلاق
              </Button>
              <Button variant="primary" onClick={handleSaveAll}>
                حفظ
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEmpModal} onHide={handleCloseEmp} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-success">
                إدارة موظفي المشروع
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
              <FormGroup className="mb-3">
                <Form.Control
                  type="text"
                  dir="rtl"
                  value={EmpName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="form-control mb-2"
                  placeholder="ادخل اسم الموظف الجديد"
                />
                <Button
                  variant="success"
                  className="w-100"
                  onClick={() =>
                    addEmployeeToProject(currentProjectId, EmpName)
                  }
                >
                  إضافة موظف للمشروع
                </Button>
              </FormGroup>

              <hr />
              <h6 className="text-dark">الموظفون الحاليون:</h6>
              <div
                className="d-flex flex-column gap-2"
                style={{ maxHeight: "180px", overflowY: "auto" }}
              >
                {currentEmployee.length > 0 ? (
                  currentEmployee.map((emp) => (
                    <div
                      key={emp.id}
                      className="d-flex justify-content-between align-items-center border p-2 rounded bg-white"
                    >
                      <span className="text-dark">{emp.name}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteEmployeeFromProject(emp.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small text-center mb-0">
                    لا توجد موظفون مضافون بعد
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEmp}>
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showComment} onHide={handleCloseEComm} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-success">
                إدارة التعليقات
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
              <FormGroup className="mb-3">
                <Form.Control
                  type="text"
                  dir="rtl"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-control mb-2"
                  placeholder="اكتب تعليقاً جديداً..."
                />
                <Button
                  variant="success"
                  className="w-100"
                  onClick={handleAddComment}
                >
                  إضافة تعليق
                </Button>
              </FormGroup>

              <hr />
              <h6 className="text-dark">التعليقات الحالية:</h6>
              <div
                className="d-flex flex-column gap-2"
                style={{ maxHeight: "180px", overflowY: "auto" }}
              >
                {comments.filter(
                  (c) => Number(c.taskId) === Number(activeTaskId),
                ).length > 0 ? (
                  comments
                    .filter((c) => Number(c.taskId) === Number(activeTaskId))
                    .map((comm) => (
                      <div
                        key={comm.id}
                        className="d-flex justify-content-between align-items-center border p-2 rounded bg-white"
                      >
                        <span className="text-dark">{comm.text}</span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteComment(comm.id)}
                        >
                          حذف
                        </Button>
                      </div>
                    ))
                ) : (
                  <p className="text-muted small text-center mb-0">
                    لا توجد تعليقات حتى الآن
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEComm}>
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Row>
      <Row>
        <Col md={6} lg={4} className="mt-3">
          <div className="border border-2 rounded-3 p-2 bg-light">
            <h5 className="text-danger mb-3 rounded-pill">
              قيد الانتظار ({pendingTasks.length})
            </h5>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => {
                const taskCommentsCount = comments.filter(
                  (c) => Number(c.taskId) === Number(task.id),
                ).length;
                return (
                  <Card
                    key={task.id}
                    style={{
                      borderRadius: "12px",
                      borderStyle: "solid",
                      borderWidth: "4px 1px",
                      borderColor: "#f44467",
                    }}
                    className="bg-light mb-2 shadow-sm"
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <h4>{task.title}</h4>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="border-0"
                        >
                          <FaTrash fill="red" />
                        </Button>
                      </Card.Title>
                      <div>
                        <p className="text-muted ms-1">{task.description}</p>
                        <div className="mt-3 d-flex justify-content-start gap-2">
                          {task.Priority && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Priority}
                            </span>
                          )}
                          {task.employee && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.employee}
                            </span>
                          )}
                          {task.Day && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Day}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-primary mb-3 ms-1">
                        ({taskCommentsCount})
                      </span>
                      <Button
                        className="btn-Comment mb-3 fw-bold btn btn-sm btn-outline-secondary"
                        onClick={() => handleShowEComm(task.id)}
                      >
                        تعليق
                      </Button>
                      <input type="file" className="ms-1 mb-3" />
                      <Button
                        className="text-black w-25 p-0 border-0 ms-auto mb-2 me-2"
                        style={{ backgroundColor: "#f44467" }}
                        onClick={() => updateTaskStatus(task.id, "in-progress")}
                      >
                        تنفيذ
                      </Button>
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-muted text-center">لا توجد مهام</p>
            )}
          </div>
        </Col>
        <Col md={6} lg={4} className="mt-3">
          <div className="border border-2 rounded-3 p-2 bg-light">
            <h5 className="text-warning mb-3">
              قيد التنفيذ ({inProgressTasks.length})
            </h5>
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => {
                const taskCommentsCount = comments.filter(
                  (c) => Number(c.taskId) === Number(task.id),
                ).length;
                return (
                  <Card
                    key={task.id}
                    style={{
                      borderRadius: "12px",
                      borderStyle: "solid",
                      borderWidth: "4px 0px",
                      borderColor: "#ff8c29",
                    }}
                    className="bg-light mb-2 shadow-sm"
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <h4>{task.title}</h4>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="border-0"
                        >
                          <FaTrash fill="red" />
                        </Button>
                      </Card.Title>
                      <div>
                        <p className="text-muted ms-1">{task.description}</p>
                        <div className="mt-3 d-flex justify-content-start gap-2">
                          {task.Priority && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Priority}
                            </span>
                          )}
                          {task.employee && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.employee}
                            </span>
                          )}
                          {task.Day && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Day}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                    <div className="d-flex align-items-center">
                      <span className="text-primary mb-3 ms-1">
                        ({taskCommentsCount})
                      </span>{" "}
                      <Button
                        className="btn-Comment mb-3 fw-bold btn btn-sm btn-outline-secondary"
                        onClick={() => handleShowEComm(task.id)}
                      >
                        تعليق
                      </Button>
                      <input type="file" className="ms-1 mb-3" />
                      <Button
                        className="text-black w-25 p-0 border-0 ms-auto mb-2 me-2"
                        style={{ backgroundColor: "#ff8c29" }}
                        onClick={() => updateTaskStatus(task.id, "completed")}
                      >
                        اكمال
                      </Button>
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-muted text-center">لا توجد مهام</p>
            )}
          </div>
        </Col>
        <Col md={12} lg={4} className="mt-3">
          <div className="border border-2 rounded-3 p-2 bg-light">
            <h5 className="text-success mb-3">
              مكتملة ({completedTasks.length})
            </h5>
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => {
                const taskCommentsCount = comments.filter(
                  (c) => Number(c.taskId) === Number(task.id),
                ).length;
                return (
                  <Card
                    key={task.id}
                    style={{
                      borderRadius: "12px",
                      borderStyle: "solid",
                      borderWidth: "4px 0px",
                      borderColor: "#05e42a",
                    }}
                    className="bg-light mb-2 shadow-sm"
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <h4>{task.title}</h4>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="border-0"
                        >
                          <FaTrash fill="red" />
                        </Button>
                      </Card.Title>
                      <div>
                        <p className="text-muted ms-1">{task.description}</p>
                        <div className="mt-3 d-flex justify-content-start gap-2">
                          {task.Priority && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Priority}
                            </span>
                          )}
                          {task.employee && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.employee}
                            </span>
                          )}
                          {task.Day && (
                            <span className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                              {task.Day}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                    <div className="d-flex align-items-center">
                      <span className="text-primary mb-3 ms-1">
                        ({taskCommentsCount})
                      </span>
                      <Button
                        className="btn-Comment mb-3 fw-bold btn btn-sm btn-outline-secondary"
                        onClick={() => handleShowEComm(task.id)}
                      >
                        تعليق
                      </Button>{" "}
                      <input type="file" className="ms-1 mb-3" />
                      <p
                        className="text-black w-25 fw-normal text-center border-0 rounded-2  ms-auto mb-2 me-2"
                        style={{ backgroundColor: "#05e42a" }}
                      >
                        مكتملة
                      </p>
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-muted text-center">لا توجد مهام</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetailsPage;
