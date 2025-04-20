using Book_Review_Store.Data;
using Book_Review_Store.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Book_Review_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        protected readonly BookReviewDbContext bookReviewDbContext;
        public ReviewController(BookReviewDbContext bookReviewDbContext)
        {
            this.bookReviewDbContext = bookReviewDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<object>> getAll()
        {
            var reviews = bookReviewDbContext.Reviews.ToList();
            return reviews;
        }

        [HttpPost]
        public async Task<ActionResult<object>> add([FromBody] ReviewViewModel reviewViewModel)
        {
            ReviewModel reviewModel = new ReviewModel
            {
                Rating = reviewViewModel.Rating,
                Comment = reviewViewModel.Comment,
                BookModelId = reviewViewModel.BookId,
            };

            await bookReviewDbContext.Reviews.AddAsync(reviewModel);
            await bookReviewDbContext.SaveChangesAsync();
            return Ok( new { msg = "added successfully" });
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ReviewViewModel>> getByBookId(int id)
        {
            List<ReviewModel> reviews = await bookReviewDbContext.Reviews
                .Where(x => x.BookModelId == id)
                .ToListAsync();

            // map model  --> view model
            List<ReviewViewModel> response = new List<ReviewViewModel>();
            for(int i = 0; i<reviews.Count; i++)
            {
                ReviewViewModel reviewViewModel = new ReviewViewModel
                {
                    Id = reviews[i].Id,
                    BookId = reviews[i].BookModelId,
                    Rating = reviews[i].Rating,
                    Comment = reviews[i].Comment,
                };
                response.Add(reviewViewModel);
            }
                 
            return Ok(response);
        }

        [HttpGet("average/{id}")]
        public async Task<ActionResult<object>> getAverageRating(int id)
        {
            var allReview = bookReviewDbContext.Reviews.ToList();
            var filteredReview = allReview.Where(x => x.BookModelId == id);

            int totalReview = 0;
            int totalRating = 0;
            foreach(var review in filteredReview)
            {
                totalReview++;
                totalRating += review.Rating;
            }
            var averageRating = totalRating / totalReview;

            return Ok(new { rating = averageRating });
        }
    }

    
}
