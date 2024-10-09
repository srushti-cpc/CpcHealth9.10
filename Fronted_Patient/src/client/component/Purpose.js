import React from 'react';
import screen1 from '../assets/app-screen-1.png';
import screen2 from '../assets/app-screen-2.png';
import screen3 from '../assets/app-screen-3.png';
import '../../client/style/purpose.css'


const Purpose = () => {
  return (
    <section class="section-how" id="how">
    <div class="container">
      <span class="subheading">PURPOSE:</span>
      <h2 class="heading-secondary">
      We offer three unique services that help address everyday challenges organizations face.
      </h2>
    </div>

    <div class="container grid grid--2-cols grid--center-v">
      
      <div class="step-text-box">
        <p class="step-number">01</p>
        <h3 class="heading-tertiary">
        CPC Health
        </h3>
        <p class="step-description">
        Cpc Health Introduces a fresh platform connecting users with a select group of local providers dedicated to restoring personalized care in healthcare.
        </p>
      </div>

      <div class="step-img-box">
        <img
          src="D:/Omnifood-main/img/app/app-screen-1.png"
          class="step-img"
          alt="iPhone app
        preferences selection screen"
        />
      </div>

 
      <div class="step-img-box">
        <img
          src="D:/Omnifood-main/img/app/app-screen-2.png"
          class="step-img"
          alt="iPhone app
        meal approving plan screen"
        />
      </div>
      <div class="step-text-box">
        <p class="step-number">02</p>
        <h3 class="heading-tertiary">POS Solution</h3>
        <p class="step-description">
        "a powerful AI Powered Point of Sale and Marketing Tool kit that can provide your buiness with double-digit growth."
        </p>
      </div>

{/*   
      <div class="step-text-box">
        <p class="step-number">03</p>
        <h3 class="heading-tertiary">Comprehensive POS Solution</h3>
        <p class="step-description">
        Thirdly, our comprehensive POS solution includes features such as weighted scale purchases, targeted promotions, inventory management, and buyer insights.

        </p>
      </div> */}
      {/* <div class="step-img-box">
        <img
          src="D:/Omnifood-main/img/app/app-screen-3.png"
          class="step-img"
          alt="iPhone app
        delivery screen"
        />
      </div> */}
    </div>
  </section>
  );
};

export default Purpose;
