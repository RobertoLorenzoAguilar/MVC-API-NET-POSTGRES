using Microsoft.AspNetCore.Mvc;

namespace WebContratos.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
