namespace Book_Review_Store.Models;

public class BookModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string About { get; set; }
    public string AuthorName { get; set; }
    public DateOnly Publication { get; set; }
    public List<ReviewModel> Reviews { get; set; }
}
