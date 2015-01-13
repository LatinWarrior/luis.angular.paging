using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Luis.Angular.Paging.Models;
using Luis.Angular.Paging.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Luis.Angular.Paging.Controllers
{
    public class CustomersController : ApiController
    {
        private readonly DemoContext _demoContext;
        //private DemoContext db = new DemoContext();

        public CustomersController()
        {
            _demoContext = new DemoContext();
        }        

        // GET: api/Customers
       // [ResponseType(typeof(PagedResult<Customer>))]
        public IHttpActionResult GetCustomers(int pageNumber = 1, int pageSize = 10, string orderBy = null)
        {

            var totalCount = _demoContext.Customers.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);
            var customerQuery = _demoContext.Customers;

            var jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            //if (QueryHelper.PropertyExists<Customer>(orderBy))
            //{
            //    var orderByExpression = QueryHelper.GetPropertyExpression<Customer>(orderBy);
            //    customerQuery = customerQuery.OrderBy(orderByExpression);
            //}
            //else
            //{
            //    customerQuery = customerQuery.OrderBy(c => c.CustomerId);
            //}

            var customers = customerQuery
                .OrderBy(c => c.customerId)
                .Skip((pageNumber - 1)*pageSize)
                .Take(pageSize)
                .ToList();

           // var serializedCustomers = JsonConvert.SerializeObject(customers, Formatting.None, jsonSerializerSettings);

            var result = new
            {
                totalCount = totalCount,
                totalPages = totalPages,
                customers = customers
            };           

            return Ok(result);


            //var jsonSerializerSettings = new JsonSerializerSettings
            //{
            //    ContractResolver = new CamelCasePropertyNamesContractResolver()
            //};

            //// Determine the number of records to skip
            //var skip = (pageNumber - 1) * pageSize;

            //// Get the total number of records
            //var totalItemCount = _demoContext.Customers.Count();

            //// Retrieve the customers for the specified page
            //var customers = _demoContext.Customers
            //    .OrderBy(c => c.LastName)
            //    .Skip(skip)
            //    .Take(pageSize)
            //    .ToList();

            //var pagedResult = new PagedResult<Customer>(customers, pageNumber, pageSize, totalItemCount);

            //var jsonResult = JsonConvert.SerializeObject(pagedResult, Formatting.None, jsonSerializerSettings);

            //return Ok(jsonResult);
        }

        // GET: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(int id)
        {
            Customer customer = _demoContext.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.customerId)
            {
                return BadRequest();
            }

            _demoContext.Entry(customer).State = EntityState.Modified;

            try
            {
                _demoContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _demoContext.Customers.Add(customer);
            _demoContext.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customer.customerId }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(int id)
        {
            Customer customer = _demoContext.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            _demoContext.Customers.Remove(customer);
            _demoContext.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _demoContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return _demoContext.Customers.Count(e => e.customerId == id) > 0;
        }
    }
}