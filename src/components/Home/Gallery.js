import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../lib/queries";
import Card from "./Card";

const styles = {
  gallery: {
    height: "calc(100vh - 120px)",
    overflow: "scroll",
  },
};

// main
function Gallery({category}) {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category},
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  if (!data) return <div>No data</div>;

  return (
    <div className="col-md-8 order-md-2 col-lg-9">
      <div className="container-fluid" style={styles.gallery}>
        <div className="row">
          {/* products */}
          {data?.products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Gallery;
