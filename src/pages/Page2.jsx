import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownItem,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { AllContext } from "../Context";
import Book from "../components/Book";
import { FaBookBookmark, FaShapes, FaUser } from "react-icons/fa6";
const DigitalLibrary = () => {
  const {
    Books,
    TitleBook,
    setTitleBook,
    DescriptionBook,
    setDescriptionBook,
    listAuthor,
    Author,
    setAuthor,
    Categorys,
    Category,
    setCategory,
    PublicationDate,
    setPublicationDate,
    addBook,
    SerchAuthor,
    setSerchAuthor,
    SearchCategory,
    setSearchCategory,
    SearchQuery,
    setSearchQuery,
  } = useContext(AllContext);
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const saveBook = () => {
    if (!TitleBook || TitleBook.trim() === "") {
      return alert("ادخل عنوان الكتاب");
    } else if (!Author || Author.trim() === "") {
      return alert("ادخل اسم المؤلف");
    } else if (!Category) {
      return alert("اختر تصنيف");
    } else if (!PublicationDate || PublicationDate.trim() === "") {
      return alert("حدد تاريخ النشر");
    } else if (!DescriptionBook || DescriptionBook.trim() === "") {
      return alert("ادخل وصف للكتاب");
    }
    addBook();
    closeModal();
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-between my-3">
            <h3 className="text-primary">المكتبة الرقمية</h3>
            <Button onClick={openModal}>+ اضف كتاب</Button>
            <Modal show={show} onHide={closeModal}>
              <Modal.Header>
                <Modal.Title className="text-success text-center">
                  اضافة كتاب جديد
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="">
                <Form.Control
                  type="text"
                  className="text-end"
                  placeholder="ادخل عنوان الكتاب"
                  onChange={(e) => setTitleBook(e.target.value)}
                />
                <Form.Control
                  type="text"
                  className="mt-3 text-end"
                  placeholder="ادخل اسم المؤلف"
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Dropdown className="mt-3" variant="light">
                  <Dropdown.Toggle className="text-dark text-end fw-bold border-secondary border-opacity-25 w-100 bg-light">
                    {Category}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100 text-center">
                    {Categorys.map((item) => (
                      <DropdownItem
                        key={item}
                        className=""
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </DropdownItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  dir="rtl"
                  type="date"
                  className="mt-3"
                  onChange={(e) => setPublicationDate(e.target.value)}
                />
                <Form.Control
                  type="text"
                  className="mt-3 text-end"
                  placeholder="ادخل وصف الكتاب"
                  onChange={(e) => setDescriptionBook(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => saveBook()} className="btn-success">
                  حفظ
                </Button>
                <Button onClick={() => closeModal()} className="btn-danger">
                  اغلاق
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="d-flex g-1">
          <Col md={4} className="d-flex">
            <Form.Control
              type="text"
              value={SearchQuery}
              placeholder="Search . . . ."
              className="bg-light"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Dropdown className=" " variant="light">
              <Dropdown.Toggle className="text-dark text-end fw-bold border-secondary border-opacity-25 w-100 bg-light">
                {SearchCategory ? SearchCategory : "كل التصنيفات"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 text-center">
                <DropdownItem onClick={() => setSearchCategory("")}>
                  كل التصنيفات
                </DropdownItem>
                {Categorys.map((item) => {
                  return (
                    <DropdownItem
                      key={item}
                      className=""
                      onClick={() => setSearchCategory(item)}
                    >
                      {item}
                    </DropdownItem>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={4}>
            <Dropdown className="">
              <Dropdown.Toggle className="text-dark text-end fw-bold border-secondary border-opacity-25 w-100 bg-light">
                {SerchAuthor ? SerchAuthor : "كل المؤلفين"}{" "}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {listAuthor.length ? (
                  <>
                    <DropdownItem onClick={() => setSerchAuthor("")}>
                      كل المؤلفين
                    </DropdownItem>
                    {listAuthor.map((item) => {
                      return (
                        <DropdownItem
                          key={item}
                          onClick={() => setSerchAuthor(item)}
                        >
                          {item}
                        </DropdownItem>
                      );
                    })}
                  </>
                ) : (
                  <h6 className="text-dark text-center fw-normal pt-1">
                    لا يوجد مؤلفين
                  </h6>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="d-flex g-1 mt-2 justify-content-between">
          <Col md={4} className="">
            <div className="bg-success bg-opacity-25 fw-bold text-center pt-2 border border-secondary border-opacity-25 border-1 rounded-2">
              <FaBookBookmark fill="green" />
              <p className="text-primary">({Books.length}) اجمالي الكتب</p>
            </div>
          </Col>
          <Col md={4} className="">
            <div className="bg-info bg-opacity-25 fw-bold text-center pt-2 border border-secondary border-opacity-25 border-1 rounded-2">
              <FaShapes fill="deepskyblue" />
              <p className="text-primary"> ({Category.length}) التصنيفات</p>
            </div>
          </Col>
          <Col md={4} className="">
            <div className="bg-warning bg-opacity-25 fw-bold text-center pt-2 border border-secondary border-opacity-25 border-1 rounded-2">
              <FaUser fill="orange" />
              <p className="text-primary"> ({listAuthor.length}) المؤلفين</p>
            </div>
          </Col>
        </Row>
        <Book />
      </Container>
    </>
  );
};
export default DigitalLibrary;
