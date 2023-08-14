import LandingTopBar from "../../components/LandingTopBar/LandingTopBar";
import budgetsterLaptopPreview from "../../assets/BudgetsterLaptopPreview.png";
import budgetsterLaptopFront from "../../assets/BudgetsterLaptopFront.png";
import {
  faMoneyBillTrendUp,
  faPiggyBank,
  faWallet,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.SectionOne.styles.css";
import "./Home.SectionTwo.styles.css";
import "./Home.SectionThree.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="home-screen-section-two-title">
          User friendly money tracking.
        </div>
        <div className="home-screen-section-two-content">
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
                <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;No
                cents, ever.
              </div>
              <div className="home-screen-section-two-list-item">
                <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;No
                complicated settings.
              </div>
              <div className="home-screen-section-two-list-item">
                <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;Set
                goals and track your trends.
              </div>
              <div className="home-screen-section-two-list-item">
                <span id="bullet-point-arrow">&#9658;</span>&nbsp;&nbsp;Easy
                time frame toggling.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-screen-section-three">
        <div className="home-screen-section-three-title">
          Track what you need to track.
        </div>
        <div className="home-screen-section-three-body">
          Budgetster focuses on the simple parts of your finances.{" "}
          <span id="home-screen-section-three-body-bold">
            What goes in and what goes out.
          </span>{" "}
          No confusing financial jargon or terms that need explaining, just you
          and your finances all in once place.
        </div>
        <div className="home-screen-section-three-categories">
          <div className="home-screen-section-three-categories-left-half">
            <div className="home-screen-section-three-icon">
              <span id="icon-large">
                <FontAwesomeIcon icon={faMoneyBillTrendUp} />
              </span>
              Income
            </div>
            <div className="home-screen-section-three-icon">
              <span id="icon-large">
                <FontAwesomeIcon icon={faWallet} />
              </span>
              Expenses
            </div>
          </div>
          <div className="home-screen-section-three-categories-right-half">
            <div className="home-screen-section-three-icon">
              <span id="icon-large">
                <FontAwesomeIcon icon={faBuildingColumns} />
              </span>
              Investments
            </div>
            <div className="home-screen-section-three-icon">
              <span id="icon-large">
                <FontAwesomeIcon icon={faPiggyBank} />
              </span>
              Savings
            </div>
          </div>
        </div>
        <div className="home-screen-section-three-bottom-title">
          Nothing more, nothing less.
        </div>
      </div>
    </div>
  );
};

export default Home;
