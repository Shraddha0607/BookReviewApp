namespace Book_Review_Store.Models;

public class ReviewModel
{
    public  int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public int BookModelId { get; set; }

}
