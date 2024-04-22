import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import WhatsAppButton from "./WhatsAppButton";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { slug } = useParams();
  const [contacts, setContacts] = useState({});
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [itemNotFound, setItemNotFound] = useState(false);

  const host = process.env.REACT_APP_BASE_URI;
  const api = axios.create({
    baseURL: host,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await api.get("/api/contacts/contacts");
        setContacts(contactsResponse.data);

        console.log("Fetching product data...");
        const productResponse = await api.get(`/api/product/${slug}`);
        console.log("Product Response:", productResponse.data);

        // Check if the response data is empty
        if (!productResponse.data) {
          console.error("Product data is empty");
          setLoading(false);
          return;
        }

        setProduct(productResponse.data);
        setLoading(false);
        console.log("Product set successfully!", productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error?.response?.status === 404) {
          setItemNotFound(true);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />{" "}
        </div>
      ) : itemNotFound ? (
        <NotFound />
      ) : (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <Card style={{ width: "30rem" }}>
            <Card.Header className="text-center">
              <h2>{product.name}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Img src={product.picture} alt={product.name} />
              <Card.Text
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {product.features && product.features.length > 0 && (
                <>
                  <Card.Title className="mt-3">Features:</Card.Title>
                  <ListGroup as="ol" numbered>
                    {product.features.map((feature, index) => (
                      <ListGroup.Item as="li" key={index}>
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
              {/* If there are no features, display a message */}
            </Card.Body>
            <Card.Footer className="text-center">
              <Button
                href={product.pdfFile}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2"
              >
                View Brochure
              </Button>
              <WhatsAppButton
                phoneNumber={contacts.whatsappContact}
                message={`Hi! Interested in ${product.name}. Could you share more details?`}
              />
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
