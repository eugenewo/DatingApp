using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("users/{userId}/photos")]
    // [Authorize]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        private readonly Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;


            Account account = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.APIKey, _cloudinaryConfig.Value.APISecret);
            _cloudinary = new Cloudinary(account);
        }



    [HttpGet("{id}", Name="GetPhoto")]
    public async Task<IActionResult> GetPhoto(int id){
    var photoFromRepo=await _repo.GetPhoto(id);
    var photo=_mapper.Map<PhotoForReturnDTO>(photoFromRepo);
    return Ok(photo);
}

 



        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForCreationDTO dto)
        {
            var userFromRepo = await _repo.GetUser(userId);

            var file = dto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
              
            dto.Url = uploadResult.Uri.ToString();
dto.PublicId=uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(dto);

            if(!userFromRepo.Photos.Any(p=>p.IsMain)){
            photo.IsMain=true;
            }


            userFromRepo.Photos.Add(photo);
           if( await _repo.SaveAll())
           {
                var photoToReturn=_mapper.Map<PhotoForReturnDTO>(photo);
            return CreatedAtRoute(nameof(GetPhoto),new{userId,id=photo.Id},photoToReturn);
           }

           return BadRequest("couldnt add a photo");
        }   
    
    [HttpPost("{photoId}/setmain")]
 public async Task<IActionResult> SetMain(int userId,int photoId)
 {

      var userFromRepo = await _repo.GetUser(userId);

      if(!userFromRepo.Photos.Any(p=>p.Id==photoId))
        return Unauthorized();

  var photoToUpdate=userFromRepo.Photos.FirstOrDefault(p=>p.Id==photoId);
  if(photoToUpdate.IsMain)
        return BadRequest("this is already a main photo");

       var currentMainPhoto=userFromRepo.Photos.First(p=>p.IsMain);
        photoToUpdate.IsMain=true; 
        currentMainPhoto.IsMain=false;

        if(await _repo.SaveAll())
      {
            return NoContent();
        }

        return BadRequest("couldnt set a main photo");
        }

 }
    
    
    }
 