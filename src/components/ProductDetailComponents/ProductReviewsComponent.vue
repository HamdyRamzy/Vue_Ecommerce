<template>
  <div class="home container">
    <div class="review-container">
      <div class="rating">
        <div class="information-container">
          <img
            src="https://via.placeholder.com/300.png/09f/fff"
            width="35"
            height="35"
            class="rounded-circle"
          />
          <p class="review-description mb-0 name-container">
            {{ review.user.username }}
          </p>
        </div>
        <star-rating
          :rating="parseInt(review.rating)"
          :increment="0.5"
          :read-only="true"
          :star-size="16"
          :show-rating="false"
        ></star-rating>
        <div class="review-description">
          <small>{{ review.comment }}</small>
          <small class="date-font d-block pt-1"
            >Reviwed on {{ review.date_added.substring(0, 10) }}</small
          >
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "ProductReviewsComponent",
  components: {
    StarRating,
  },
  props: {
    review: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.review-description {
  text-align: start;
}
.date-font {
  font-weight: 600;
}
.information-container {
  display: flex;
  align-items: center;
}
.name-container {
  margin-left: 10px;
}
</style>
