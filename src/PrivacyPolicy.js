import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="content-box">
      <Navbar />
      <div className="main" style={{ textAlign: "center" }}>
        <h2 id="what-personal-information-we-collect">
          What personal information we collect
        </h2>
        <p>
          <strong>Absolutely nothing.</strong>
        </p>
        <p>
          When you use this extension on Arxiv, we use a locally saved mapping
          to find the video and provide you with the results.
        </p>
        <p>
          We don't store or transfer any of your personal information remotely
          or locally on your own device as it may lack the proper encryption
          required to store sensitive information.
        </p>

        <h2 id="updates-to-our-privacy-policy">
          Updates to our Privacy Policy
        </h2>
        <p>
          Any changes to this Policy will be solely for improving your
          experience when using the extension. In addition, future changes will
          be updated on this page.
        </p>

        <h2 id="terms-of-service">Terms of Service</h2>
        <p>
          papers-with-video is a free chrome extension that enables you to find
          video explanations for research papers on Arxiv.
        </p>

        <h2 id="disclaimer">Disclaimer</h2>
        <ul>
          <li>The extension is not affiliated with arxiv.org in any way.</li>
        </ul>
      </div>
      <Footer CustomStyle={{ marginTop: 0 }} />
    </div>
  );
};

export default PrivacyPolicy;
