import { Button, Card } from "react-bootstrap";
import { useShopingContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromItems,
  } = useShopingContext();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="d-flex justify-content-between 
                 align-items-baseline mb-4"
        >
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseItemQuantity(id)}
            >
              {" "}
              + Add To Card
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column">
              <div
                className="d-flex align-items-center justify-context-center mb-2"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseItemQuantity(id)}> - </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in Card
                </div>
                <Button onClick={() => increaseItemQuantity(id)}> + </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromItems(id)}
              >
                {" "}
                Remove{" "}
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
