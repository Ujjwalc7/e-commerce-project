import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import './card.css'

const Cards = ({ product }) => {
  return (
    <Card className="border-0 max-w-[220px]">
      <Card.Img
        variant="top"
        src={product.imageUrl}
      />
      <Card.Body style={{ padding: "10px 0px" }}>
        <Card.Title style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
          {product.title}
        </Card.Title>
        <div className="flex justify-between items-center max-[1120px]:block">
          <Rating
            name="read-only"
            value={3}
            readOnly
            style={{ fontSize: "15px" }}
          />
          <p className="m-0 text-sm">3 reviews</p>
        </div>
        <Card.Text>
          Rs. <span className="line-through">{product.price}</span>{" "}
          <span>{product.discountedPrice}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
