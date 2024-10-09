import React from 'react';
import '../style/solution.css';
import Meal1 from '../assets/meal-1.jpg';


const Solution = () => {
return (
    <section class="section-meals" id="meals">
    <div class="container center-text">
      <span class="subheading">Solutions Coming Soon</span>
      <h2 class="heading-secondary">
      </h2>
    </div>
    <div class="container grid grid--3-cols margin-bottom-md">
      <div class="meal">
        <img
          src={Meal1}
          class="meal-img"
          alt="Japanese Gyozas"
        />
        <div class="meal-content">
          {/* <div class="meal-tags">
            <span class="tag tag--vegetarian">Vegetarian</span>
          </div> */}
          <p class="meal-title">Food Pantry</p>
          {/* <ul class="meal-attributes">
            <li class="meal-attribute">
              <ion-icon class="meal-icon" name="flame-outline"></ion-icon>
              <span><strong>650</strong> calories</span>
            </li>
            <li class="meal-attribute">
              <ion-icon
                class="meal-icon"
                name="restaurant-outline"
              ></ion-icon>
              <span>NutriScore &reg; <strong>74</strong></span>
            </li>
            <li class="meal-attribute">
              <ion-icon class="meal-icon" name="star-outline"></ion-icon>
              <span><strong>4.9</strong> rating (537)</span>
            </li>
          </ul> */}
        </div>
      </div>
   
      <div class="meal">
        <img
          src={Meal1}
          class="meal-img"
          alt="Japanese Gyozas"
        />
        <div class="meal-content">
          {/* <div class="meal-tags">
            <span class="tag tag--vegetarian">Vegetarian</span>
          </div> */}
          <p class="meal-title">Fund Reach by CPC</p>
          {/* <ul class="meal-attributes">
            <li class="meal-attribute">
              <ion-icon class="meal-icon" name="flame-outline"></ion-icon>
              <span><strong>650</strong> calories</span>
            </li>
            <li class="meal-attribute">
              <ion-icon
                class="meal-icon"
                name="restaurant-outline"
              ></ion-icon>
              <span>NutriScore &reg; <strong>74</strong></span>
            </li>
            <li class="meal-attribute">
              <ion-icon class="meal-icon" name="star-outline"></ion-icon>
              <span><strong>4.9</strong> rating (537)</span>
            </li>
          </ul> */}
        </div>
      </div>
    

   

    </div>

    {/* <div class="container all-recipes">
      <a href="#" class="link">See all Solutions &rarr;</a>
    </div> */}
  </section>
  );
};

export default Solution;
