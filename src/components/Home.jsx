import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import { listProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

function Home() {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center mt-2">Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
