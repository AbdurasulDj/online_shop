import { Row, Col } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";

export function Store() {
  return (
    <>
      <h1>In the Store</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {storeItems.map((items) => (
          <Col key={items.id}>
            <StoreItem {...items} />
          </Col>
        ))}
      </Row>
    </>
  );
}
