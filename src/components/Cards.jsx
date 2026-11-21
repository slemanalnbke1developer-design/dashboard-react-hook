import React from "react";
import { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { AllContext } from "../Context";
import { useNavigate } from "react-router-dom";
const Cards = () => {
  const { projects, Tasks, deleteProject, Employee } = useContext(AllContext);
  const navigate = useNavigate();
  return (
    <>
      <Row>
        {projects && projects.length > 0
          ? projects.map((project) => {
              const NumTask = Tasks.filter(
                (task) => Number(task.projectId) === Number(project.id),
              ).length;
              const NumEmployees = Employee.filter(
                (emp) => Number(emp.projectId) === Number(project.id),
              ).length;
              return (
                <Col md={4} key={project.id} className="mt-3">
                  <Card
                    style={{
                      borderColor: project.color,
                      borderWidth: "4px 1px",
                      borderRadius: "12px",
                      borderStyle: "solid",
                    }}
                    className="bg-light card-project"
                  >
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center">
                        <h3 className="">{project.name}</h3>
                        <Button
                          className="btnDelet mb-3"
                          onClick={() => {
                            deleteProject(project.id);
                          }}
                        >
                          <FaTrash className="iconDelet" />
                        </Button>
                      </Card.Title>
                      <div
                        className=""
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <h6 className="text-dark ms-1">
                          {project.description}
                        </h6>
                        <div className="mt-3 d-flex justify-content-start">
                          <p className="text-muted fs-12 border border-2 rounded-pill px-2 py-1">
                            عدد المهام : {NumTask}
                          </p>
                          <p className="text-muted fs-12 ms-2 border border-2 rounded-pill px-2 py-1">
                            الاعضاء : {NumEmployees}
                          </p>
                        </div>
                        <span className="text-muted fs-12 fw-bold">
                          عرض التفاصيل
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ""}
      </Row>
    </>
  );
};
export default Cards;
