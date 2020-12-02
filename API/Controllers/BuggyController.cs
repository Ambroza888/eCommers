using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);

            if( thing == null)
                return NotFound(new ApiResponse(404));
            // status 404, tittle "Not Found"
            return Ok();
        }
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42);

            // "object reference not set to an instance of an object" because cannot execute ToString() to null(something doesn't exist);
            var thingToReturn = thing.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            // status 400, tittle "Bad Request"
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            // status 400 title: "One or more validation errors occurred"
            // badrequest/five
            // errors: { "id": ["The value 'five' is not valid"]}
            // needs to be int that is what is expected.

            return Ok();
        }

        // {{url}}/api/endpointthatdoesntexist
        // 404 Not Found
    }
}