import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AllContext } from "../Context";
import {
  FaTrash,
  FaBookBookmark,
  FaStar,
  FaRegStar,
  FaUser,
  FaTags,
  FaCalendarDays,
  FaArrowRight,
} from "react-icons/fa6";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  Badge,
} from "react-bootstrap";

const BookDetails = () => {
  const { Books, addReview, deletReview, deletBook } = useContext(AllContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentBookId = Number(id);

  const currentBook = Books.find((b) => String(b.id) === String(currentBookId));

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleCloseReview = () => {
    setShowReviewModal(false);
    setReviewText("");
    setReviewRating(5);
  };
  const handleShowReview = () => setShowReviewModal(true);

  const handleSaveReview = () => {
    if (!reviewText || reviewText.trim() === "") {
      alert("الرجاء إدخال نص المراجعة");
      return;
    }
    addReview(currentBookId, reviewText, reviewRating);
    handleCloseReview();
  };

  if (!currentBook) {
    return (
      <Container className="mt-5 text-center">
        <h3 className="text-danger">الكتاب غير موجود</h3>
        <Button className="mt-3" onClick={() => navigate(-1)}>
          العودة للمكتبة
        </Button>
      </Container>
    );
  }
  const reviewsList = currentBook.Reviews || [];
  const totalReviews = reviewsList.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviewsList.reduce(
            (acc, item) => acc + (Number(item.rating) || 0),
            0,
          ) / totalReviews
        ).toFixed(1)
      : "0.0";
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-muted" />);
      }
    }
    return stars;
  };

  return (
    <Container className="mt-4 pb-5" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="light"
            className="border shadow-sm"
            onClick={() => navigate(-1)}
          >
            <FaArrowRight />
          </Button>
          <h3 className="fw-bold m-0" style={{ color: "#6f42c1" }}>
            تفاصيل الكتاب
          </h3>
        </div>
        <Button
          style={{ backgroundColor: "#6f42c1", border: "none" }}
          onClick={handleShowReview}
        >
          + إضافة مراجعة
        </Button>
      </div>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 rounded-4 p-3 text-center h-100 bg-white">
            <div
              className="d-flex justify-content-center align-items-center bg-light rounded-4 py-5 mb-3 position-relative"
              style={{ minHeight: "280px" }}
            >
              <FaBookBookmark size={120} style={{ color: "#6f42c1" }} />
              <span className="position-absolute top-50 start-50 translate-middle text-white fs-1 fw-bold">
                {currentBook.title ? currentBook.title.charAt(0) : ""}
              </span>
            </div>

            <div className="text-start px-2">
              <Badge
                bg=""
                className="mb-3 px-3 py-2 rounded-pill"
                style={{ backgroundColor: "#6f42c1", color: "#fff" }}
              >
                {currentBook.Category}
              </Badge>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex">
                  {renderStars(Number(averageRating))}
                </div>
                <span className="fw-bold">{averageRating}</span>
                <span className="text-muted small">
                  (مراجعة {totalReviews})
                </span>
              </div>
            </div>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
            <h3 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
              {currentBook.title}
            </h3>

            <div className="d-flex flex-column gap-2 text-secondary mb-4">
              <div className="d-flex align-items-center gap-2">
                <FaUser className="text-muted" />
                <span>
                  المؤلف: <strong>{currentBook.Author}</strong>
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaTags className="text-muted" />
                <span>
                  التصنيف: <strong>{currentBook.Category}</strong>
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaCalendarDays className="text-muted" />
                <span>
                  تاريخ النشر: <strong>{currentBook.day}</strong>
                </span>
              </div>
            </div>

            <hr className="text-muted opacity-25" />

            <div>
              <h5 className="fw-bold text-dark mb-2">الوصف</h5>
              <p className="text-muted m-0" style={{ lineHeight: "1.8" }}>
                {currentBook.description || "لا يوجد وصف متوفر لهذا الكتاب."}
              </p>
            </div>
          </Card>

          {/* قسم المراجعات */}
          <Card className="shadow-sm border-0 rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">
              المراجعات ({totalReviews})
            </h5>

            {reviewsList.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 rounded-3 border bg-light position-relative"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#6f42c1",
                          }}
                        >
                          <FaUser size={16} />
                        </div>
                        <div>
                          <h6 className="m-0 fw-bold text-dark">
                            المستخدم الحالي
                          </h6>
                          <span
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {rev.date || "حديثاً"}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0 text-decoration-none"
                        onClick={() => deletReview(currentBook.id, rev.id)}
                      >
                        <FaTrash size={14} />
                      </Button>
                    </div>

                    <div className="mb-2 d-flex">{renderStars(rev.rating)}</div>
                    <p className="text-secondary m-0">{rev.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-3 m-0">
                لا توجد مراجعات حتى الآن. كن أول من يضيف مراجعة!
              </p>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        show={showReviewModal}
        onHide={handleCloseReview}
        centered
        dir="rtl"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold" style={{ color: "#6f42c1" }}>
            إضافة مراجعة وتقييم
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary">
                التقييم بالنجوم:
              </Form.Label>
              <div className="d-flex gap-2 align-items-center">
                <Form.Select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                  className="w-50"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 / 5)</option>
                  <option value="4">⭐⭐⭐⭐ (4 / 5)</option>
                  <option value="3">⭐⭐⭐ (3 / 5)</option>
                  <option value="2">⭐⭐ (2 / 5)</option>
                  <option value="1">⭐ (1 / 5)</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary">
                نص المراجعة:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="اكتب تعليقك أو تقييمك للكتاب هنا..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReview}>
            إغلاق
          </Button>
          <Button
            style={{ backgroundColor: "#6f42c1", border: "none" }}
            onClick={handleSaveReview}
          >
            حفظ المراجعة
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookDetails;
