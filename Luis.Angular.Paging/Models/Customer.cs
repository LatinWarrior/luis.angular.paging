using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Luis.Angular.Paging.Models
{
    [DataContract]
    public class Customer
    {
        [Key]
        [DataMember(Name = "customerId")]
        public int customerId { get; set; }

        [Required]
        [DataMember(Name = "firstName")]
        public string firstName { get; set; }

        [Required]
        [DataMember(Name = "lastName")]     
        public string lastName { get; set; }        

        [Required]
        [DataMember(Name = "email")]       
        public string email { get; set; }
    }
}