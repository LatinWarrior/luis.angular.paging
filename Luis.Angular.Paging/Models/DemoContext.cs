using System.Data.Entity;

namespace Luis.Angular.Paging.Models
{
    public class DemoContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DemoContext()
            : base("DemoContext")
        {
        }
    }
}