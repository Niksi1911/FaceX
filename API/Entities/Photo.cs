using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;


[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string PublicId { get; set; } = null!;


    //Navigation properties
    public int AppUserId { get; set; }
    public User AppUser { get; set; } = null!;
}