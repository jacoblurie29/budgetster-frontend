import LandingTopBar from "../../components/LandingTopBar/LandingTopBar";
import budgetsterLaptopPreview from "../../assets/BudgetsterLaptopPreview.png";
import budgetsterLaptopFront from "../../assets/BudgetsterLaptopFront.png";
import "./Home.SectionOne.styles.css";
import "./Home.SectionTwo.styles.css";

const Home = () => {
  console.log("something");

  return (
    <div className="home-screen-container">
      <LandingTopBar />
      <div className="home-screen-section-one">
        <div className="home-screen-section-one-left">
          <h1 className="home-screen-section-one-left-title">
            Personal Finance.
          </h1>
          <h1 className="home-screen-section-one-left-title-decorated">
            Simplified.
          </h1>

          <p className="home-screen-paragraph">
            A finance application without the confusion of a finance appliation.
            The first finance planner made for{" "}
            <span className="home-screen-paragraph-bold">
              less planning and more doing
            </span>
            .
          </p>
        </div>
        <div className="home-screen-section-one-right">
          <img
            className="home-screen-laptop-preview-slanted-image"
            src={budgetsterLaptopPreview}
            alt=""
          />
        </div>
      </div>
      <div className="home-screen-section-two">
        <div className="home-screen-section-two-left">
          <div className="home-screen-laptop-front-image-container">
            <img
              className="home-screen-laptop-front-image"
              src={budgetsterLaptopFront}
              alt=""
            />
          </div>
        </div>
        <div className="home-screen-section-two-right">
          <div className="home-screen-section-two-list">
            <div className="home-screen-section-two-list-item">
              <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;No cents,
              ever.
            </div>
            <div className="home-screen-section-two-list-item">
              <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;No
              complicated settings.
            </div>
            <div className="home-screen-section-two-list-item">
              <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;Set goals
              and track your trends.
            </div>
            <div className="home-screen-section-two-list-item">
              <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;Easy time
              frame toggling.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
