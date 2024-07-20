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

        const productResponse = await api.get(`/api/product/${slug}`);
        if (!productResponse.data) {
          console.error("Product data is empty");
          setLoading(false);
          return;
        }

        const fetchedProduct = productResponse.data;

        // Check if features is an array of strings
        if (
          fetchedProduct.features &&
          typeof fetchedProduct.features[0] === "string" &&
          fetchedProduct.features[0].startsWith("[") &&
          fetchedProduct.features[0].endsWith("]")
        ) {
          try {
            fetchedProduct.features = JSON.parse(fetchedProduct.features[0]);
          } catch (e) {
            console.error("Error parsing features:", e);
          }
        }

        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error?.response?.status === 404) {
          setItemNotFound(true);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
        </div>
      ) : itemNotFound ? (
        <NotFound />
      ) : (
        <section className="bg-image justify-content-center cta2">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <Card>
                  <Card.Header className="text-center">
                    <h2>{product.name}</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-6 align-items-center">
                        <Card.Img
                          src={product.picture}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="row">
                          <div className="col">
                            <Card.Text
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                lineHeight: "1.5",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: product.description,
                              }}
                            />
                            <div className="col-md-6">
                              {product.features &&
                                product.features.length > 0 && (
                                  <>
                                    <Card.Title>Features:</Card.Title>
                                    <ListGroup as="ul">
                                      {product.features.map(
                                        (feature, index) => (
                                          <ListGroup.Item as="li" key={index}>
                                            {feature}
                                          </ListGroup.Item>
                                        )
                                      )}
                                    </ListGroup>
                                  </>
                                )}
                            </div>
                          </div>
                          <Button
                            href={product.pdfFile}
                            style={{ marginBottom: "15px", marginTop: "20px" }}
                            variant="warning"
                            target="_blank"
                            type="button"
                            rel="noopener noreferrer"
                            className="btn btn-info"
                          >
                            View Brochure
                          </Button>
                          <WhatsAppButton
                            phoneNumber={contacts.whatsappContact}
                            message={`Hi! Interested in ${product.name}. Could you share more details?`}
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center"></Card.Footer>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
