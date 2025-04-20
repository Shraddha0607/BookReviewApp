using Book_Review_Store.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Review_Store.Data;

public class BookReviewDbContext : DbContext
{
    public BookReviewDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<BookModel> Books { get; set; }
    public DbSet<ReviewModel> Reviews { get; set; }
}
