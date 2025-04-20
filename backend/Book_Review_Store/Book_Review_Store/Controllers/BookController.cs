using Book_Review_Store.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book_Review_Store.Models;

namespace Book_Review_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookReviewDbContext bookReviewDbContext;

        public BookController(BookReviewDbContext bookReviewDbContext)
        {
            this.bookReviewDbContext = bookReviewDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<object>> getBook()
        {
            var book = await bookReviewDbContext.Books.ToListAsync();
            return Ok(book);
        }

        [HttpGet("/id/{id}")]
        public async Task<ActionResult<BookViewModel>> getBookById(int id)
        {
            var book = await bookReviewDbContext.Books.FirstOrDefaultAsync(x => x.Id== id);

            BookViewModel bookViewModel = new BookViewModel
            {
                Id = book.Id,
                Name = book.Name,
                About = book.About,
                AuthorName = book.AuthorName,
                Publication = book.Publication,
            };

            return Ok(bookViewModel);
        
        }
    }

    


}
