import React from "react";
import { useContext } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaBookBookmark } from "react-icons/fa6";
import { AllContext } from "../Context";
import { useNavigate } from "react-router-dom";
const Book = () => {
  const {
    Books,
    deletBook,
    SerchAuthor,
    SearchCategory,
    SearchQuery,
  } = useContext(AllContext);
  const navigate = useNavigate();
  const filteredBooks = useMemo(() => {
    return Books.filter((item) => {
      const matchesQuery = SearchQuery
        ? item.title.toLowerCase().includes(SearchQuery.toLowerCase())
        : true;
      const matchesAuthor = SerchAuthor ? item.Author === SerchAuthor : true;
      const matchesCategory = SearchCategory
        ? item.Category === SearchCategory
        : true;
      return matchesQuery && matchesAuthor && matchesCategory;
    });
  }, [Books, SearchQuery, SerchAuthor, SearchCategory]);
  return (
    <Row className="mt-3 px-1">
      {filteredBooks && filteredBooks.length > 0 ? (
        filteredBooks.map((item) => {
          return (
            <Col sm={6} md={4} lg={3} xl={2} key={item.id} className="p-2 mb-2">
              <Card className="bg-danger rounded-3 bg-opacity-10 h-100">
                <div className="d-flex justify-content-center position-relative">
                  <Badge
                    className="position-absolute top-0 end-0 text-secondary border border-1 border-secondary border-opacity-25 bg-warning"
                    style={{ marginTop: "2px", marginRight: "1px" }}
                  >
                    {item.Category}
                  </Badge>
                  <FaBookBookmark
                    className="icon-book bg-info bg-opacity-25 w-100 py-3 rounded-top-3"
                    fill="deepskyblue"
                    size={"140px"}
                  />
                </div>
                <Card.Body className="p-2 d-flex flex-column h-100">
                  <h3 className="text-primary fw-bold">
                    {item.title.length > 25
                      ? item.title.slice(0, 20) + ".."
                      : item.title}
                  </h3>
                  <h5 className="text-muted">
                    {item.Author.length > 20
                      ? item.Author.slice(0, 20) + ".."
                      : item.Author}
                  </h5>
                  <div className="mt-auto">
                    <p className="text-muted">{item.day}</p>
                    <div className="d-flex justify-content-between mt-auto p-2">
                      <Button
                        className="btn-book p-0"
                        onClick={() => navigate(`/BookDetails/${item.id}`)}
                      >
                        عرض التفاصيل
                      </Button>
                      <Button
                        className="btn-book btn-delet p-0"
                        onClick={() => deletBook(item.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <h6>لا يوجد كتب</h6>
      )}
    </Row>
  );
};
export default Book;
