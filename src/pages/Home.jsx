import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormGroup,
  Dropdown,
} from "react-bootstrap";
import { BiClipboard, BiCheckCircle, BiTime } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useState, useContext, useMemo } from "react";
import Cards from "../components/Cards";
import { AllContext } from "../Context";
const Home = () => {
  const {
    addproject,
    projects,
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
  } = useContext(AllContext);
  const totalTasks = Tasks ? Tasks.length : 0;
  const completedTasks = Tasks
    ? Tasks.filter((task) => task.status === "completed").length
    : 0;
  const inProgressTasks = Tasks
    ? Tasks.filter((task) => task.status === "in-progress").length
    : 0;
  const TotalProjects = projects ? projects.length : 0;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSaveAll = () => {
    if (!Name || Name.trim() === "") {
      alert("الرجاء ادخال اسم");
      return;
    } else if (!Description || Description.trim() === "") {
      alert("الرجاء ادخال وصف");
      return;
    }
    addproject();
    handleClose();
    setNum(num + 1);
  };
  const sortedInProgressTasks = useMemo(() => {
    const priorityRank = {
      عالية: 3,
      متوسطة: 2,
      منخفضة: 1,
    };

    return Tasks
      ? Tasks.filter((task) => task.status === "in-progress").sort((a, b) => {
          const rankA = priorityRank[a.Priority] || 0;
          const rankB = priorityRank[b.Priority] || 0;
          return rankB - rankA;
        })
      : [];
  }, [Tasks]);
  return (
    <>
      <Container className="">
        <Row>
          <Col className="d-flex justify-content-between align-items-center my-3">
            <h5 className="text-danger">لوحة تحكم بالمشاريع</h5>
            <Button className="btn" onClick={handleShow}>
              + اضف مشروع
            </Button>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} centered className="mb-5 pb-5">
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">إضافة مشروع</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <FormGroup>
              <Form.Control
                type="text"
                dir="rtl"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                placeholder="ادخل اسم المشروع"
              />
              <Form.Control
                type="text"
                dir="rtl"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control mb-3"
                placeholder="ادخل وصف المشروع"
              />
              <Dropdown className="w-100" drop="down">
                <Dropdown.Toggle className="w-100" variant="light">
                  {Colorize}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {colors.map((item) => (
                    <Dropdown.Item
                      key={item.hex}
                      onClick={() => setColorize(item.hex)}
                      className="d-flex align-items-center gap-2 py-2"
                    >
                      <FaCircle
                        style={{ color: item.hex, fill: item.hex }}
                        size={18}
                      />
                      <span style={{ color: item.hex, fontWeight: "normal" }}>
                        {item.hex}
                      </span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleSaveAll();
              }}
            >
              حفظ
            </Button>
            <Button variant="danger" onClick={handleClose}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="text-center g-3">
          <Col md={4} className="">
            <div className="bg-primary rounded-2 pb-1 pt-3">
              <BiClipboard className="fs-2 mb-2" fill="ghostwhite"/>
              <h2 className="text-light">{totalTasks}</h2>
              <p className="fs-14 text-light">اجمالي المهام</p>
            </div>
          </Col>
          <Col md={4} className="">
            <div className="bg-warning rounded-2 pb-1 pt-3">
              <BiTime className="fs-2 mb-2" fill="ghostwhite"/>
              <h2 className="text-light">{inProgressTasks}</h2>
              <p className="fs-14 text-light">مهام قيد التنفيذ</p>
            </div>
          </Col>
          <Col md={4} className="">
            <div className="bg-success rounded-2 pb-1 pt-3">
              <BiCheckCircle className="fs-2 mb-2" fill="ghostwhite"/>
              <h2 className="text-light">{completedTasks}</h2>
              <p className="fs-14 text-light">المهام المكتملة</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="my-3 ms-2">
            <h5 className="text-black">
              <span className="text-danger">( {TotalProjects} )</span> المشاريع
            </h5>
          </Col>
        </Row>
        <Cards />
        <Row className="mt-4">
          <Col>
            <h5 className="text-warning mb-3">المهام قيد التنفيذ</h5>
            {sortedInProgressTasks.length > 0 ? (
              sortedInProgressTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="mt-2 border border-2 rounded-3 bg-light py-2"
                  >
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <h4 className="text-primary">{task.title}</h4>
                      <p className="text-muted">{task.Day}</p>
                    </div>
                    <h6></h6>
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <h6 className="text-muted">{task.description}</h6>
                      <span className="text-muted border border-2 py-1 px-2 rounded-pill">
                        {task.Priority}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted">لا توجد مهام قيد التنفيذ حالياً</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
