namespace Book_Review_Store.Models;

public class BookViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string About { get; set; }
    public string AuthorName { get; set; }
    public DateOnly Publication { get; set; }
}
