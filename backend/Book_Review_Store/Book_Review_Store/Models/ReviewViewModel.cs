namespace Book_Review_Store.Models;

public class ReviewViewModel
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public int BookId { get; set; }
}
