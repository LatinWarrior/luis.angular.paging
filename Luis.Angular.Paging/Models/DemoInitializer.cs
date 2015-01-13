using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using FizzWare.NBuilder;

namespace Luis.Angular.Paging.Models
{
    public class DemoInitializer : DropCreateDatabaseIfModelChanges<DemoContext>
    {        
        protected override void Seed(DemoContext context)
        {
            CreateCustomers(context);
        }

        private static void CreateCustomers(DemoContext context)
        {
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