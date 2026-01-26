export const RatingItems = (ratingNumber: number, className = "") => {
   const ratingArray = [];
   for (let index = 1; index <= 5; index++) {
      if (index <= ratingNumber)
         ratingArray.push(
            <i  key={`filled-star-${index}`} className={`bi bi-star-fill text-warning ${className}`}></i>
         );
      else ratingArray.push(<i  key={`empty-star-${index}`} className={`bi bi-star ${className}`}></i>);
   }
   return ratingArray;
};
