import WOW from "wowjs";
import AboutUs from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  appliedConfig,
  introBackgroundConfig,
  themeConfig,
} from "./config/commonConfig";
import { Tooltip } from "./components/Tooltip";
import CallToAction from "./components/CallToAction";
import FAQs from "./components/FAQs";
import FullScreenVideoBgIntro from "./components/themes/fullScreen/IntroVideoBg";
import FullScreenHeader from "./components/themes/fullScreen/Header";
import FullScreenDefaultIntro from "./components/themes/fullScreen/IntroDefault";
import FullScreenImgBgIntro from "./components/themes/fullScreen/IntroImageBg";
import BottomHeader from "./components/themes/bottomHeader/Header";
import StandardMenuHeader from "./components/themes/StandardMenu/Header";
import BottomHeaderDefaultIntro from "./components/themes/bottomHeader/IntroDefault";
import BottomHeaderImgBgIntro from "./components/themes/bottomHeader/IntroImageBg";
import BottomHeaderVideoBgIntro from "./components/themes/bottomHeader/IntroVideoBg";
import StandardMenuDefaultIntro from "./components/themes/StandardMenu/IntroDefault";
import StandardMenuImgBgIntro from "./components/themes/StandardMenu/IntroImageBg";
import StandardMenuVideoBgIntro from "./components/themes/StandardMenu/IntroVideoBg";
import { useLocation, useNavigate } from "react-router-dom";

import $ from "jquery";

function App() {
  let appliedTheme = appliedConfig.appliedTheme;
  let appliedIntro = appliedConfig.appliedIntro;

  const handleNavClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const searchParams = useLocation().search;
  appliedTheme =
    new URLSearchParams(searchParams).get("theme") ??
    appliedConfig.appliedTheme;
  appliedIntro =
    new URLSearchParams(searchParams).get("intro") ??
    appliedConfig.appliedIntro;
  const themeColor = new URLSearchParams(searchParams).get("themeColor");

  console.log(appliedTheme, appliedIntro);

  useEffect(() => {
    if (themeColor) {
      import("./sass/color-" + themeColor + ".scss");
    }
  }, [themeColor]);

  useEffect(() => {
    // Accessing scss variable "--background-color"
    // and "--text-color" using plain JavaScript
    // and changing the same according to the state of "darkTheme"
    $(".switcher-toggle").on("click", function () {
      var div = $("#styles-switcher.left");
      var divright = $("#styles-switcher.right");

      if (divright.css("right") === "-202px") {
        $(divright).animate({ right: "0px" }, 300).addClass("shadow");
      } else {
        $(divright).animate({ right: "-202px" }, 300).removeClass("shadow");
      }

      if (div.css("left") === "-202px") {
        $(div).animate({ left: "0px" }, 300).addClass("shadow");
      } else {
        $(div).animate({ left: "-202px" }, 300).removeClass("shadow");
      }
    });
    $("#styles-switcher ul li").on("click", function () {
      var path = $(this).data("path");
      $("#color-switcher").attr("href", path);
      $(this).parent().find("li").removeClass("active");
      $(this).addClass("active");
    });

    $("#reset-color").on("click", function () {
      $("#color-switcher").removeAttr("href");
      $("#styles-switcher ul li").parent().find("li").removeClass("active");
    });
  }, []);

  const redirect = (redirectColor) => {
    let queryString = "";
    if (appliedTheme) queryString += "?theme=" + appliedTheme;
    else queryString += "?theme=" + appliedConfig.appliedTheme;

    if (appliedIntro) queryString += "&intro=" + appliedIntro;
    else queryString += "&intro=" + appliedConfig.appliedIntro;

    if (themeColor) queryString += "&themeColor=" + redirectColor;
    else queryString += "&themeColor=" + redirectColor;

    // navigate(`/${queryString}`)
    console.log(window.location);

    window.location.href =
      window.location.origin + window.location.pathname + queryString;
  };

  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);

  const checkScrollTop = () => {
    let scrollTopBtn = document.getElementById("back-to-top");

    if (scrollTopBtn) {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", checkScrollTop);
  }

  const getHeader = () => {
    if (appliedTheme === themeConfig.BottomHeader) {
      return <BottomHeader></BottomHeader>;
    } else if (appliedTheme === themeConfig.FullScreenMenu) {
      return (
        <FullScreenHeader
          textWhite={appliedIntro === introBackgroundConfig.image}
        ></FullScreenHeader>
      );
    } else {
      return <StandardMenuHeader></StandardMenuHeader>;
    }
  };

  const getBottomHeaderIntro = () => {
    if (appliedIntro === introBackgroundConfig.default) {
      return <BottomHeaderDefaultIntro></BottomHeaderDefaultIntro>;
    } else if (appliedIntro === introBackgroundConfig.image) {
      return <BottomHeaderImgBgIntro></BottomHeaderImgBgIntro>;
    } else {
      return <BottomHeaderVideoBgIntro></BottomHeaderVideoBgIntro>;
    }
  };

  const getFullScreenIntro = () => {
    if (appliedIntro === introBackgroundConfig.default) {
      return <FullScreenDefaultIntro></FullScreenDefaultIntro>;
    } else if (appliedIntro === introBackgroundConfig.image) {
      return <FullScreenImgBgIntro></FullScreenImgBgIntro>;
    } else {
      return <FullScreenVideoBgIntro></FullScreenVideoBgIntro>;
    }
  };

  const getStandardMenuIntro = () => {
    if (appliedIntro === introBackgroundConfig.default) {
      return <StandardMenuDefaultIntro></StandardMenuDefaultIntro>;
    } else if (appliedIntro === introBackgroundConfig.image) {
      return <StandardMenuImgBgIntro></StandardMenuImgBgIntro>;
    } else {
      return <StandardMenuVideoBgIntro></StandardMenuVideoBgIntro>;
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div id="main-wrapper">
          {appliedTheme === themeConfig.BottomHeader && getBottomHeaderIntro()}
          {getHeader()}

          <div id="content" role="main">
            {appliedTheme === themeConfig.FullScreenMenu &&
              getFullScreenIntro()}
            {appliedTheme === themeConfig.StandardMenu &&
              getStandardMenuIntro()}

            <AboutUs></AboutUs>
            <Services></Services>
            <Resume></Resume>
            <Portfolio></Portfolio>
            <CallToAction></CallToAction>
            <FAQs></FAQs>
            <Testimonials></Testimonials>
            <Contact></Contact>
          </div>
          <Footer handleNavClick={handleNavClick}></Footer>
        </div>
        {/* back to top */}
        <Tooltip text="Back to Top" placement="left">
          <span
            id="back-to-top"
            className="rounded-circle"
            style={{ display: scrollTopVisible ? "inline" : "none" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <i className="fas fa-arrow-up"></i>
          </span>
        </Tooltip>

        {/* <div id="styles-switcher" className="right">
          <h2 className="text-3 fw-600">Color Switcher</h2>
          <hr />
          <ul>
            <li
              className="cyan"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("cyan");
              }}
              title="Cyan"
              data-path="css/color-cyan.css"
            />
            <li
              className="spring-green"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("spring-green");
              }}
              title="Spring Green"
              data-path="css/color-spring-green.css"
            />
            <li
              className="green-yellow"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("green-yellow");
              }}
              title="Green Yellow"
              data-path="css/color-green-yellow.css"
            />
            <li
              className="lime-punch"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("lime-punch");
              }}
              title="Lime Punch"
              data-path="css/color-lime-punch.css"
            />
            <li
              className="violet"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("violet");
              }}
              title="Violet"
              data-path="css/color-violet.css"
            />
            <li
              className="orange"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("orange");
              }}
              title="Orange"
              data-path="css/color-orange.css"
            />
            <li
              className="pale-golden-rod"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("pale-golden-rod");
              }}
              title="Pale Golden Rod"
              data-path="css/color-pale-golden-rod.css"
            />
            <li
              className="yellow"
              id="reset-color"
              data-bs-toggle="tooltip"
              onClick={() => {
                redirect("");
              }}
              title="Reset Default Yellow"
            />
          </ul>
          <button className="btn switcher-toggle">
            <i className="fas fa-cog" />
          </button>
        </div>
         */}
      </div>
    </>
  );
}

export default App;
