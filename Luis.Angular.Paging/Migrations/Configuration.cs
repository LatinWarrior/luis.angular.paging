using System.Data.Entity.Migrations;
using FizzWare.NBuilder;
using Luis.Angular.Paging.Models;

namespace Luis.Angular.Paging.Migrations
{    
    internal sealed class Configuration : DbMigrationsConfiguration<DemoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DemoContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var customers = Builder<Customer>
                .CreateListOfSize(2000)
                .All()
                .With(c => c.firstName = Faker.Name.First())
                .With(c => c.lastName = Faker.Name.Last())
                .With(c => c.email = Faker.Internet.FreeEmail())
                .Build();

            foreach (var customer in customers)
            {
                context.Customers.AddOrUpdate(c => c.customerId,
                    customer);
            }

            context.SaveChanges();

        }
    }
}
