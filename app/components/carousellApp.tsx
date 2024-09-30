import { Carousel } from "antd";

const carouselItemStyle: React.CSSProperties = {
  height: "300px", // Height for each card
  width: "250px", // Width for the card to look square-ish
  backgroundColor: "white",
  opacity: "0.7",
  borderRadius: "20px", // Rounded corners like a card
  padding: "20px", // Space inside the card
  //boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // shadow
  display: "flex", // Flexbox for alignment
  flexDirection: "column",
  justifyContent: "center",
  //alignItems: "center",
  textAlign: "center",
  marginLeft: "125px",
  marginBottom: "140px",
  marginTop: "140px",
};

const containerStyle: React.CSSProperties = {
  height: "100%",
  width: "200%",
  //color: "#fff",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: "160px",
  textAlign: "center",
  //background: "#364d79",
};

const Carousell: React.FC = () => (
  <Carousel
    speed={700}
    autoplay
    autoplaySpeed={3000}
    vertical
    //infinite={true}
    //waitForAnimate={true}
    dots={false}
    //effect="scrollx"
    style={{ height: "100%" }}
  >
    <div style={containerStyle}>
      <div style={carouselItemStyle}>
        <h3>Engagement</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>+78.12%</p>
        <p style={{ fontSize: "14px", color: "#888" }}>
          This increase in engagement highlights the success of our recent
          strategies.
        </p>
      </div>
    </div>
    <div style={containerStyle}>
      <div style={carouselItemStyle}>
        <h3>Total Sales</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>$527.8K</p>
        <p style={{ fontSize: "14px", color: "#888" }}>
          Sales performance has been exceptional this past month.
        </p>
      </div>
    </div>
    <div style={containerStyle}>
      <div style={carouselItemStyle}>
        <h3>Customer Retention</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>92.5%</p>
        <p style={{ fontSize: "14px", color: "#888" }}>
          Retention rates have been consistently high over the last 6 months.
        </p>
      </div>
    </div>
    <div style={containerStyle}>
      <div style={carouselItemStyle}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "left" }}>
          "Basement is surprisingly handy for keeping all my business stuff in
          one place."
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#888",
            marginTop: "30px",
          }}
        >
          David Miller
        </p>
        <p style={{ fontSize: "14px", color: "#888" }}>E-Commerce Specialist</p>
      </div>
    </div>
  </Carousel>
);

export default Carousell;
